#!/usr/bin/env node
/**
 * PowerLab GitHub PR & Vercel Webhook Lifecycle Manager
 * 
 * Strictly enforces GitHub PR creation and GitHub API merging to guarantee:
 * 1. Clean PR audit history on GitHub.com
 * 2. Automatic Vercel Production deployment on merge
 * 3. Automatic Vercel Preview retirement on remote branch deletion
 * 4. Zero local merges into main
 */

const cp = require('child_process');

function getGitPassword() {
  return new Promise((resolve, reject) => {
    const p = cp.spawn('git', ['credential', 'fill']);
    p.stdin.write('protocol=https\nhost=github.com\n\n');
    let out = '';
    p.stdout.on('data', d => out += d);
    p.on('close', code => {
      const match = out.match(/^password=(.*)$/m);
      if (match) resolve(match[1]);
      else reject(new Error('GitHub token not found in git credential helper'));
    });
  });
}

async function githubRequest(path, method = 'GET', body = null) {
  const token = await getGitPassword();
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'PowerLab-Lifecycle-Bot',
      Accept: 'application/vnd.github.v3+json',
    },
  };
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`https://api.github.com/repos/miadsaadidi/powerlab${path}`, options);
  if (res.status === 204) return { status: 204 };
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

async function listPRs() {
  console.log('\n🔍 Fetching Pull Requests for miadsaadidi/powerlab...\n');
  const openRes = await githubRequest('/pulls?state=open');
  const closedRes = await githubRequest('/pulls?state=closed');

  console.log('--- OPEN PULL REQUESTS ---');
  if (!openRes.data.length) console.log('No open pull requests.');
  for (const pr of openRes.data) {
    console.log(`[PR #${pr.number}] ${pr.title}`);
    console.log(`  Branch: ${pr.head.ref} -> ${pr.base.ref}`);
    console.log(`  URL: ${pr.html_url}\n`);
  }

  console.log('--- RECENT CLOSED PULL REQUESTS ---');
  if (!closedRes.data.length) console.log('No closed pull requests.');
  for (const pr of closedRes.data.slice(0, 5)) {
    console.log(`[PR #${pr.number}] ${pr.title}`);
    console.log(`  Merged At: ${pr.merged_at || 'Closed without merge'}`);
    console.log(`  URL: ${pr.html_url}\n`);
  }
}

async function mergePR(prNumber) {
  if (!prNumber) {
    console.error('❌ Error: Please specify PR number, e.g. node scripts/pr-lifecycle.js merge 4');
    process.exit(1);
  }

  console.log(`\n🚀 Checking PR #${prNumber} on GitHub...`);
  const prRes = await githubRequest(`/pulls/${prNumber}`);
  if (!prRes.ok) {
    console.error(`❌ Failed to fetch PR #${prNumber}:`, prRes.data.message);
    process.exit(1);
  }

  const pr = prRes.data;
  const branchName = pr.head.ref;
  console.log(`Found PR #${pr.number}: "${pr.title}"`);
  console.log(`Source branch: ${branchName} -> Target: ${pr.base.ref}`);

  if (pr.state !== 'open') {
    console.error(`❌ PR #${prNumber} is already ${pr.state}.`);
    process.exit(1);
  }

  console.log(`\n⚡ Step 1: Merging PR #${prNumber} via GitHub API (fires Vercel deploy webhook)...`);
  const mergeRes = await githubRequest(`/pulls/${prNumber}/merge`, 'PUT', {
    commit_title: `Merge pull request #${prNumber} from miadsaadidi/${branchName}`,
    merge_method: 'merge',
  });

  if (!mergeRes.ok || !mergeRes.data.merged) {
    console.error('❌ Merge failed:', mergeRes.data);
    process.exit(1);
  }
  console.log(`✅ Successfully merged PR #${prNumber}! (Commit SHA: ${mergeRes.data.sha})`);

  console.log(`\n🗑️ Step 2: Verifying remote branch "${branchName}" deletion...`);
  const delRes = await githubRequest(`/git/refs/heads/${branchName}`, 'DELETE');
  if (delRes.status === 204) {
    console.log(`✅ Remote branch "${branchName}" deleted.`);
  } else if (delRes.status === 404 || delRes.status === 422) {
    console.log(`✅ Remote branch "${branchName}" already deleted by GitHub auto-deletion.`);
  } else {
    console.warn(`⚠️ Warning: Could not delete remote branch (HTTP ${delRes.status}):`, delRes.data);
  }

  console.log('\n🔄 Step 3: Synchronizing local repository...');
  try {
    cp.execSync('git checkout main', { stdio: 'inherit' });
    cp.execSync('git pull origin main', { stdio: 'inherit' });
    try {
      cp.execSync(`git branch -d ${branchName}`, { stdio: 'inherit' });
    } catch {
      // Branch might have already been deleted or current
    }
    cp.execSync('git fetch --prune', { stdio: 'inherit' });
    cp.execSync('git remote prune origin', { stdio: 'inherit' });
  } catch (err) {
    console.warn('⚠️ Local sync notice:', err.message);
  }

  console.log('\n📡 Step 4: GitHub Actions Post-Merge Watchdog is running...');
  console.log('   Watch workflow: https://github.com/miadsaadidi/powerlab/actions');
  console.log('   Production domain: https://powelab.org');
  console.log('\n🎉 PR merge lifecycle complete!\n');
}

const action = process.argv[2];
const arg = process.argv[3];

if (action === 'merge') {
  mergePR(arg).catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
} else {
  listPRs().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}
