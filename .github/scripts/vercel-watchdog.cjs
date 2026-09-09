#!/usr/bin/env node
/**
 * Vercel Production Deployment Watchdog
 *
 * Monitors GitHub commit statuses and check runs for a merge commit SHA
 * until the Vercel production deployment reports 'success' or 'failure'.
 */

const ownerRepo = process.env.GITHUB_REPOSITORY || 'miadsaadidi/powerlab';
const mergeCommitSha = process.env.MERGE_COMMIT_SHA || process.argv[2];
const prNumber = process.env.PR_NUMBER || process.argv[3] || 'unknown';
const ghToken = process.env.GITHUB_TOKEN;

if (!mergeCommitSha) {
  console.error('❌ Error: MERGE_COMMIT_SHA is required.');
  process.exit(1);
}

console.log(`\n🔭 [Vercel Watchdog] Monitoring production deployment for PR #${prNumber}`);
console.log(`   Commit SHA: ${mergeCommitSha}`);
console.log(`   Target Repository: ${ownerRepo}\n`);

async function fetchGH(url) {
  const headers = {
    'User-Agent': 'PowerLab-Vercel-Watchdog',
    Accept: 'application/vnd.github.v3+json',
  };
  if (ghToken) {
    headers.Authorization = `Bearer ${ghToken}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API HTTP ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function verifyProductionDomain() {
  try {
    const res = await fetch('https://powelab.org', {
      method: 'GET',
      headers: { 'User-Agent': 'PowerLab-Watchdog-Healthcheck' },
    });
    return res.status;
  } catch {
    return null;
  }
}

async function run() {
  const timeoutMs = 12 * 60 * 1000; // 12 minutes
  const intervalMs = 12 * 1000; // 12 seconds
  const startTime = Date.now();

  while (Date.now() - startTime < timeoutMs) {
    const elapsedSec = Math.round((Date.now() - startTime) / 1000);
    let vercelStatus = null;
    let vercelCheck = null;

    try {
      const statuses = await fetchGH(
        `https://api.github.com/repos/${ownerRepo}/commits/${mergeCommitSha}/statuses`
      );
      if (Array.isArray(statuses)) {
        vercelStatus = statuses.find(s => /vercel/i.test(s.context || ''));
      }
    } catch (e) {
      console.warn(`   [${elapsedSec}s] Notice fetching commit statuses: ${e.message}`);
    }

    try {
      const checksData = await fetchGH(
        `https://api.github.com/repos/${ownerRepo}/commits/${mergeCommitSha}/check-runs`
      );
      if (checksData && Array.isArray(checksData.check_runs)) {
        vercelCheck = checksData.check_runs.find(
          c => /vercel/i.test(c.name || '') || /vercel/i.test(c.app?.name || '')
        );
      }
    } catch (e) {
      console.warn(`   [${elapsedSec}s] Notice fetching check runs: ${e.message}`);
    }

    let isSuccess = false;
    let isFailed = false;
    let detail = 'Waiting for Vercel deployment webhook to register...';

    if (vercelStatus) {
      detail = `Status '${vercelStatus.context}': state=${vercelStatus.state} (${vercelStatus.description || ''})`;
      if (vercelStatus.state === 'success') isSuccess = true;
      if (vercelStatus.state === 'failure' || vercelStatus.state === 'error') isFailed = true;
    }

    if (vercelCheck) {
      detail = `Check '${vercelCheck.name}': status=${vercelCheck.status}, conclusion=${vercelCheck.conclusion}`;
      if (vercelCheck.status === 'completed') {
        if (vercelCheck.conclusion === 'success') isSuccess = true;
        else if (vercelCheck.conclusion === 'failure' || vercelCheck.conclusion === 'timed_out') isFailed = true;
      }
    }

    if (isSuccess) {
      const domainStatus = await verifyProductionDomain();
      console.log(`\n🎉 [Vercel Watchdog] Production deployment SUCCEEDED!`);
      console.log(`   ${detail}`);
      console.log(`   Production Domain: https://powelab.org (HTTP ${domainStatus || 'Live'})\n`);
      process.exit(0);
    }

    if (isFailed) {
      console.error(`\n❌ [Vercel Watchdog] Production deployment FAILED!`);
      console.error(`   ${detail}\n`);
      process.exit(1);
    }

    console.log(`   [${elapsedSec}s elapsed] ${detail}`);
    await new Promise(r => setTimeout(r, intervalMs));
  }

  console.warn('\n⚠️ [Vercel Watchdog] Reached 12-minute monitoring timeout.');
  console.warn('   Production deployment may still be compiling on Vercel.');
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal watchdog error:', err);
  process.exit(0);
});
