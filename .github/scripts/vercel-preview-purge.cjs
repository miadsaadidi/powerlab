#!/usr/bin/env node
/**
 * Vercel Preview Deployments Purge
 *
 * Calls the Vercel REST API to locate and purge stale preview deployments
 * matching the closed feature branch name, ensuring zero orphan preview cards.
 */

const token = process.env.VERCEL_TOKEN;
const projectId = process.env.VERCEL_PROJECT_ID || 'prj_fJpcovcIk6eIOsWU71kvyx49smQ6';
const teamId = process.env.VERCEL_ORG_ID || process.env.VERCEL_TEAM_ID;
const branch = process.env.BRANCH_NAME || process.argv[2];

async function purgePreviewDeployments() {
  if (!token) {
    console.log('::warning::VERCEL_TOKEN is not configured in repository secrets. Skipping preview purge.');
    return;
  }

  if (!branch) {
    console.log('::warning::BRANCH_NAME not provided. Skipping preview purge.');
    return;
  }

  console.log(`\n🧹 [Vercel Preview Purge] Searching for preview deployments for branch: "${branch}"...`);
  console.log(`   Project ID: ${projectId}`);

  let activeTeamId = teamId;
  let listUrl = `https://api.vercel.com/v6/deployments?projectId=${projectId}${activeTeamId ? `&teamId=${activeTeamId}` : ''}&limit=100`;

  try {
    let res = await fetch(listUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'PowerLab-Vercel-Purge',
      },
    });

    // If 403 forbidden due to personal account scope, retry without teamId
    if (res.status === 403 && activeTeamId) {
      console.log('   Notice: Retrying with personal scope (without teamId)...');
      activeTeamId = null;
      listUrl = `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=100`;
      res = await fetch(listUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'PowerLab-Vercel-Purge',
        },
      });
    }

    if (!res.ok) {
      console.error(`❌ Failed to list Vercel deployments (HTTP ${res.status}):`, await res.text());
      return;
    }

    const data = await res.json();
    const deployments = data.deployments || [];

    // Filter preview deployments matching the closed branch
    const matching = deployments.filter(d => {
      const commitRef = d.meta?.githubCommitRef || d.meta?.branch;
      const target = d.target;
      return commitRef === branch && target !== 'production';
    });

    if (matching.length === 0) {
      console.log(`✅ No active preview deployments found for branch "${branch}". Vercel dashboard is clean.`);
      return;
    }

    console.log(`Found ${matching.length} preview deployment(s) associated with branch "${branch}":`);

    let purgedCount = 0;
    for (const dep of matching) {
      console.log(`- Deleting deployment ${dep.uid} (${dep.url || dep.name})...`);
      let deleteUrl = `https://api.vercel.com/v13/deployments/${dep.uid}${activeTeamId ? `?teamId=${activeTeamId}` : ''}`;
      let delRes = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'PowerLab-Vercel-Purge',
        },
      });

      if (delRes.status === 403 && activeTeamId) {
        deleteUrl = `https://api.vercel.com/v13/deployments/${dep.uid}`;
        delRes = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'User-Agent': 'PowerLab-Vercel-Purge',
          },
        });
      }

      if (delRes.ok) {
        purgedCount++;
        console.log(`  ✅ Successfully purged ${dep.uid}`);
      } else {
        console.warn(`  ⚠️ Failed to purge ${dep.uid} (HTTP ${delRes.status}):`, await delRes.text());
      }
    }

    console.log(`\n🎉 [Vercel Preview Purge] Successfully removed ${purgedCount} stale preview deployment(s).`);
  } catch (err) {
    console.error('Fatal error during preview purge:', err);
  }
}

purgePreviewDeployments().catch(err => {
  console.error('Fatal preview purge error:', err);
  process.exit(0);
});
