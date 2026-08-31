const fs = require('fs');
const path = require('path');

const errors = [];
const warnings = [];
const pagesAudited = [];

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
      
      if (title.length < 35 || title.length > 60) {
        errors.push(`[TITLE LENGTH] ${relPath}: len=${title.length} "${title}"`);
      }
      if (desc.length < 100 || desc.length > 160) {
        errors.push(`[DESC LENGTH] ${relPath}: len=${desc.length} "${desc}"`);
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
      
      if (title.length < 35 || title.length > 60) {
        errors.push(`[TITLE LENGTH] ${relPath}: len=${title.length} "${title}"`);
      }
      if (desc.length < 100 || desc.length > 160) {
        errors.push(`[DESC LENGTH] ${relPath}: len=${desc.length} "${desc}"`);
      }
      return;
    }
  }
  
  warnings.push(`[NO METADATA EXTRACTED] ${relPath}`);
}

walkDir(path.join(__dirname, '..', 'src', 'app'));

console.log(`Audited ${pagesAudited.length} pages.`);
console.log(`Errors: ${errors.length}`);
errors.forEach(e => console.log(' ', e));
console.log(`Warnings: ${warnings.length}`);
warnings.forEach(w => console.log(' ', w));
