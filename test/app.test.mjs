import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../app.js', import.meta.url), 'utf8');
const context = {
  console, Date, Math, JSON, Object, String, Array, Set, URL, Blob: class {},
  localStorage: { getItem(){return null}, setItem(){} },
  document: {
    getElementById(){ return { innerHTML:'', textContent:'', classList:{add(){},remove(){}} } },
    querySelectorAll(){ return [] }, querySelector(){ return null }
  },
  structuredClone, confirm(){return true}, setTimeout(){}, window:{},
};
vm.createContext(context);
vm.runInContext(`${source}\nglobalThis.__api={seed,generateSections,esc};`, context);
const { seed, generateSections, esc } = context.__api;

test('fallback generator includes actual member-owned open tasks and decision reasoning', () => {
  const sections = generateSections('Abhinav Kumar', 'Riya Das');
  assert.match(sections['Pending work'], /Finish event registration flow/);
  assert.match(sections['Decisions and context'], /moderation and notification scope/);
  assert.match(sections['Ownership transfer'], /Riya Das/);
  assert.match(sections['Risks and issues'], /Production cloud credentials not issued/);
});

test('fallback generator explicitly marks missing information', () => {
  const sections = generateSections('Meera Sharma', 'Riya Das');
  assert.match(sections['Completed work'], /Information not recorded\./);
});

test('generator never includes another member’s task as departing member work', () => {
  const sections = generateSections('Abhinav Kumar', 'Riya Das');
  assert.doesNotMatch(sections['Pending work'], /Add expired device token cleanup/);
});

test('HTML escaping protects record text rendered into the interface', () => {
  assert.equal(esc('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
});
