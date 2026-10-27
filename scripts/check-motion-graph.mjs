import assert from 'node:assert/strict';
import { createField, matchingAt, projectNode, connectionControl, INTRO_DURATION, PLAYBACK_DURATION } from '../src/lib/allocation-field.ts';

assert(PLAYBACK_DURATION > 0 && PLAYBACK_DURATION < 5000, 'Automatic opening playback must end within five seconds');

let frames = 0;
for (const [columns, rows] of [[14,8],[10,6]]) {
  const field = createField(columns, rows);
  const feasible = new Set(field.possible.map(edge => `${Math.min(edge.a,edge.b)}:${Math.max(edge.a,edge.b)}`));
  assert.equal(feasible.size, field.possible.length, 'No duplicate possible connections');
  for (const edge of field.possible) {
    assert.notEqual(field.nodes[edge.a].kind, field.nodes[edge.b].kind, 'Possible connections respect the two vertex sets');
    assert.notEqual(edge.a, edge.b, 'No self-loops');
  }
  for (let time = 0; time <= INTRO_DURATION; time += 50) {
    const selected = matchingAt(field, time);
    const points = field.nodes.map(node => projectNode(node, time, columns === 10 ? 390 : 1440, 570));
    for (const point of points) assert(Number.isFinite(point.x) && Number.isFinite(point.y), 'Projection stays finite');
    const used = new Set();
    for (const edge of selected) {
      assert(feasible.has(`${Math.min(edge.a,edge.b)}:${Math.max(edge.a,edge.b)}`), 'Selected edge must be feasible');
      assert.notEqual(field.nodes[edge.a].kind, field.nodes[edge.b].kind, 'Each edge must connect the two vertex sets');
      assert(!used.has(edge.a) && !used.has(edge.b), `Matching reuses a vertex at ${time}ms`);
      used.add(edge.a); used.add(edge.b);
      assert(edge.opacity > 0 && edge.opacity <= 1);
      const control = connectionControl(points[edge.a], points[edge.b], edge);
      assert(Number.isFinite(control.x) && Number.isFinite(control.y), 'Connection curve stays finite');
    }
    frames++;
  }
  assert.equal(matchingAt(field, INTRO_DURATION).length * 2, field.nodes.length, 'Settled state must cover all vertices once');
}
assert.throws(() => createField(9,6));
console.log(`Allocation film: ${frames} sampled states passed; valid partial matchings throughout, complete matchings at rest.`);
