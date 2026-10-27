import assert from 'node:assert/strict';
import { blockingPairs, initialMatching, resolvedMatching, preferences } from '../src/lib/blocking-pair.ts';

for (const matching of [initialMatching, resolvedMatching]) {
  assert.deepEqual(Object.keys(matching).sort(), ['A', 'B']);
  assert.deepEqual(Object.values(matching).sort(), ['X', 'Y'], 'Each mentor has exactly one applicant');
}
assert.deepEqual(blockingPairs(initialMatching), [{ applicant: 'A', mentor: 'Y' }], 'Exactly A and Y mutually prefer one another initially');
assert.deepEqual(blockingPairs(resolvedMatching), [], 'The rematched example is stable');
const onlyOneSidePrefers = { ...preferences, mentors: { ...preferences.mentors, Y: ['B', 'A'] } };
assert.deepEqual(blockingPairs(initialMatching, onlyOneSidePrefers), [], 'A one-sided preference is not a blocking pair');
console.log('Blocking pair: both complete matchings valid; exactly one initial blocking pair, none after rematching; mutual preference required.');
