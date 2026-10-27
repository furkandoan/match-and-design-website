import { readdir, readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createField, matchingAt, INTRO_DURATION } from '../src/lib/allocation-field.ts';

const root = path.resolve('dist');
const issues = [];
const pages = [];
const titles = new Set();
const descriptions = new Set();
const field = createField();
const graph = { nodes: field.nodes.map(node => ({type: node.kind})), possible: field.possible.map(edge => [edge.a,edge.b]), selected: matchingAt(field, INTRO_DURATION).map(edge => [edge.a,edge.b]) };
const usedVertices = new Set();
for (const [a,b] of graph.selected) {
  if (!graph.nodes[a] || !graph.nodes[b]) { issues.push('Graph references a missing vertex'); continue; }
  if (graph.nodes[a].type === graph.nodes[b].type) issues.push('Selected graph edge violates the two participant/resource sets');
  if (!graph.possible.some(([x,y]) => x === a && y === b)) issues.push('Selected graph edge is not feasible');
  if (usedVertices.has(a) || usedVertices.has(b)) issues.push('Graph matching uses a vertex more than once');
  usedVertices.add(a); usedVertices.add(b);
}
if (usedVertices.size !== graph.nodes.length) issues.push('Graph matching does not cover the stated participants and resources');
let checkedReferences = 0;
let clientJavaScriptBytes = 0;
const inlineModules = new Set();
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(match => [match[1], match[2] ?? match[3] ?? match[4]]));
const files = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, item.name);
    if (item.isDirectory()) await walk(full);
    else files.push(full);
  }
}
await walk(root);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const cached = new Map(await Promise.all(htmlFiles.map(async file => [file, await readFile(file, 'utf8')])));
for (const file of files.filter(file => file.endsWith('.js'))) clientJavaScriptBytes += (await stat(file)).size;
for (const [file, html] of cached) {
  const relative = path.relative(root, file);
  const fail = message => issues.push(`${relative}: ${message}`);
  const h1s = [...html.matchAll(/<h1\b/gi)];
  const pageScripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].filter(match => attributes(`<script${match[1]}>`).type !== 'application/ld+json');
  let pageInlineJavaScriptBytes = 0;
  for (const script of pageScripts) {
    inlineModules.add(script[2]);
    pageInlineJavaScriptBytes += Buffer.byteLength(script[2]);
  }
  if (pageInlineJavaScriptBytes > 10000) fail('Page exceeds the 10 KB inline JavaScript budget');
  if (h1s.length !== 1) fail(`Expected one h1, found ${h1s.length}`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1];
  if (!title || titles.has(title)) fail('Missing or duplicate page title');
  titles.add(title);
  const tags = [...html.matchAll(/<[a-z][^>]*>/gi)].map(match => match[0]);
  const meta = tags.filter(tag => /^<meta\s/i.test(tag)).map(attributes);
  const description = meta.find(item => item.name === 'description')?.content;
  if (!description || descriptions.has(description)) fail('Missing or duplicate description');
  descriptions.add(description);
  if (!/<html\b[^>]*lang="en"/.test(html)) fail('Missing English language declaration');
  if (!meta.find(item => item.name === 'robots')) fail('Missing indexing policy');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  if (new Set(ids).size !== ids.length) fail('Duplicate element IDs');
  let lastHeading = 0;
  for (const heading of html.matchAll(/<h([1-6])\b/g)) {
    const level = Number(heading[1]);
    if (level > lastHeading + 1) fail(`Heading level jumps from h${lastHeading} to h${level}`);
    lastHeading = level;
  }
  for (const tag of tags) {
    const attrs = attributes(tag);
    if (/^<img\s/i.test(tag)) {
      if (attrs.alt === undefined) fail('Image without alternative text');
      if (!attrs.width || !attrs.height) fail('Image without explicit dimensions');
    }
    if (/^<(input|textarea)\s/i.test(tag) && attrs.id && !html.includes(`for="${attrs.id}"`)) fail(`Unlabelled input: ${attrs.id}`);
    const ref = attrs.href ?? attrs.src;
    if (ref === undefined) continue;
    if (ref === '' || ref === '#') { fail('Empty or placeholder link'); continue; }
    if (/^(mailto:|tel:|data:|https?:\/\/|\/\/)/.test(ref)) {
      if (attrs.src && /^https?:\/\//.test(ref)) fail(`External runtime asset: ${ref}`);
      continue;
    }
    const basePath = relative.endsWith('index.html') ? `/${relative.slice(0, -10)}` : `/${relative}`;
    const url = new URL(ref.replace(/&amp;/g, '&'), `https://local.test${basePath}`);
    const pathname = decodeURIComponent(url.pathname);
    let target = path.join(root, pathname);
    if (!path.extname(target)) target = path.join(target, 'index.html');
    if (pathname.endsWith('/')) target = path.join(root, pathname, 'index.html');
    checkedReferences++;
    try { await stat(target); } catch { fail(`Broken local reference: ${ref}`); continue; }
    if (url.hash && target.endsWith('.html')) {
      const targetHtml = cached.get(target) ?? await readFile(target, 'utf8');
      const id = decodeURIComponent(url.hash.slice(1));
      if (!targetHtml.includes(`id="${id}"`)) fail(`Broken anchor: ${ref}`);
    }
  }
  const visibleText = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<[^>]*>/g, ' ');
  if (/trusted by \d|cutting.edge|revolutionary|next.generation|transform your business|unlocking potential/i.test(visibleText)) fail('Prohibited promotional copy');
  pages.push({ file: relative, title, h1Count: h1s.length, description, htmlBytes: Buffer.byteLength(html), inlineJavaScriptBytes: pageInlineJavaScriptBytes });
}
for (const script of inlineModules) clientJavaScriptBytes += Buffer.byteLength(script);
const report = { checkedAt: new Date().toISOString(), pages: pages.length, checkedReferences, clientJavaScriptBytes, graph: { nodes: graph.nodes.length, possibleEdges: graph.possible.length, selectedEdges: graph.selected.length, uniquelyMatchedVertices: usedVertices.size }, issues, details: pages };
await mkdir('qa', { recursive: true });
await writeFile('qa/static-audit.json', JSON.stringify(report, null, 2) + '\n');
console.log(`${pages.length} pages; ${checkedReferences} local references; ${clientJavaScriptBytes} bytes client JavaScript; ${issues.length} issues.`);
if (issues.length) { for (const issue of issues) console.error(issue); process.exitCode = 1; }
