const fs = require('fs');
const path = require('path');

const errors = [];
const warnings = [];
const pagesAudited = [];
const descriptionMap = new Map();

function recordDescription(relPath, desc) {
  if (!desc || desc.trim() === '') {
    errors.push(`[EMPTY DESCRIPTION] ${relPath}`);
    return;
  }
  const cleanDesc = desc.trim();
  if (descriptionMap.has(cleanDesc)) {
    const existing = descriptionMap.get(cleanDesc);
    warnings.push(`[DUPLICATE DESCRIPTION] "${cleanDesc.slice(0, 40)}..." shared between ${existing} and ${relPath}`);
  } else {
    descriptionMap.set(cleanDesc, relPath);
  }
}

function walkDir(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const p = path.join(dir, item);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.next' && item !== '.git') {
        walkDir(p);
      }
    } else if (item === 'page.tsx') {
      auditPage(p);
    }
  }
}

function auditPage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(path.join(__dirname, '..', 'src', 'app'), filePath).replace(/\\/g, '/');
  const isDynamicRoute = relPath.includes('[slug]');

  // check buildPageMetadata call
  const bpmMatch = content.match(/buildPageMetadata\(\{([\s\S]*?)\}\)/);
  if (bpmMatch) {
    const inner = bpmMatch[1];
    const titleMatch = inner.match(/title:\s*["'`](.*?)["'`]/);
    const descMatch = inner.match(/description:\s*["'`](.*?)["'`]/);
    const canonMatch = inner.match(/canonicalPath:\s*["'`](.*?)["'`]/);

    if (titleMatch && descMatch) {
      const title = titleMatch[1];
      const desc = descMatch[1];
      const canon = canonMatch ? canonMatch[1] : '';

      pagesAudited.push({ file: relPath, title, desc, canon, type: 'buildPageMetadata' });
      recordDescription(relPath, desc);

      if (!isDynamicRoute) {
        if (title.length < 35 || title.length > 60) {
          warnings.push(`[TITLE LENGTH] ${relPath}: len=${title.length} "${title}"`);
        }
        if (desc.length < 100 || desc.length > 160) {
          errors.push(`[DESC LENGTH] ${relPath}: len=${desc.length} "${desc}"`);
        }
      }
      return;
    }
  }

  // check export const metadata = { ... }
  const metaMatch = content.match(/export const metadata\s*(?::\s*Metadata)?\s*=\s*\{([\s\S]*?)\n\};/);
  if (metaMatch) {
    const inner = metaMatch[1];
    const absTitleMatch = inner.match(/absolute:\s*["'`](.*?)["'`]/);
    const titleMatch = absTitleMatch || inner.match(/title:\s*["'`](.*?)["'`]/);
    const descMatch = inner.match(/description:\s*["'`](.*?)["'`]/);
    const canonMatch = inner.match(/canonical:\s*["'`](.*?)["'`]/);

    if (titleMatch && descMatch) {
      const title = titleMatch[1];
      const desc = descMatch[1];
      const canon = canonMatch ? canonMatch[1] : '';
      pagesAudited.push({ file: relPath, title, desc, canon, type: 'metadata' });
      recordDescription(relPath, desc);

      if (!isDynamicRoute) {
        if (title.length < 35 || title.length > 60) {
          warnings.push(`[TITLE LENGTH] ${relPath}: len=${title.length} "${title}"`);
        }
        if (desc.length < 100 || desc.length > 160) {
          errors.push(`[DESC LENGTH] ${relPath}: len=${desc.length} "${desc}"`);
        }
      }
      return;
    }
  }

  warnings.push(`[NO STATIC METADATA] ${relPath}`);
}

function auditDataEntities() {
  const papersFile = path.join(__dirname, '..', 'src', 'data', 'research-papers.ts');
  if (!fs.existsSync(papersFile)) return;
  const content = fs.readFileSync(papersFile, 'utf8');

  // Audit BENCHMARK_DATASETS
  const datasetMatches = content.matchAll(/slug:\s*"([^"]+)",[\s\S]*?metaDescription:\s*"([^"]+)"/g);
  for (const match of datasetMatches) {
    const slug = match[1];
    const desc = match[2];
    const pathRef = `/datasets/${slug}`;
    pagesAudited.push({ file: pathRef, desc, type: 'dataset' });
    recordDescription(pathRef, desc);
    if (desc.length < 100 || desc.length > 160) {
      errors.push(`[DESC LENGTH] ${pathRef}: len=${desc.length} "${desc}"`);
    }
  }

  // Audit RESEARCH_PAPERS
  const paperMatches = content.matchAll(/slug:\s*"([^"]+)",[\s\S]*?metaDescription:\s*"([^"]+)"/g);
  for (const match of paperMatches) {
    const slug = match[1];
    const desc = match[2];
    const pathRef = `/research/${slug}`;
    // don't duplicate dataset slugs if any
    if (pathRef.startsWith('/datasets/')) continue;
  }
}

walkDir(path.join(__dirname, '..', 'src', 'app'));
auditDataEntities();

console.log(`Audited ${pagesAudited.length} pages/entities.`);
console.log(`Errors: ${errors.length}`);
errors.forEach(e => console.log('  ', e));
console.log(`Warnings: ${warnings.length}`);
warnings.forEach(w => console.log('  ', w));

if (errors.length > 0) {
  process.exitCode = 1;
}
