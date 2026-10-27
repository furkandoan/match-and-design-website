/** Geometry for the illustrative allocation film. No customer or product data. */
export interface FieldNode { id: number; column: number; row: number; x: number; z: number; kind: 0 | 1; seed: number; }
export interface FieldEdge { a: number; b: number; }
export interface MatchingEdge extends FieldEdge { opacity: number; }
export interface Field { columns: number; rows: number; nodes: FieldNode[]; possible: FieldEdge[]; }
export const INTRO_DURATION = 8200;
/** Wall-clock playback stays under five seconds; geometry retains its original timeline. */
export const PLAYBACK_DURATION = 4800;

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
export const easeOut = (value: number) => 1 - Math.pow(1 - clamp(value), 4);

export function createField(columns = 14, rows = 8): Field {
  if (columns < 2 || rows < 2 || columns % 2 || rows % 2) throw new Error('The allocation field requires even grid dimensions.');
  const nodes: FieldNode[] = [];
  const possible: FieldEdge[] = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const id = row * columns + column;
      const seed = ((id * 73 + 19) % 101) / 101;
      nodes.push({ id, column, row, x: (column - (columns - 1) / 2) * 86 + Math.sin(id * 2.41) * 21, z: (row - (rows - 1) / 2) * 94 + Math.cos(id * 1.83) * 18, kind: (column + row) % 2 as 0 | 1, seed });
      if (column < columns - 1) possible.push({ a: id, b: id + 1 });
      if (row < rows - 1) possible.push({ a: id, b: id + columns });
      if (column < columns - 2 && row < rows - 1 && column % 3 === 0) possible.push({ a: id, b: id + columns + 2 });
    }
  }
  // Sparse junctions branch across nearby rows. Odd grid-distance preserves the two vertex sets.
  const known = new Set(possible.map(edge => `${edge.a}:${edge.b}`));
  for (const node of nodes) {
    if ((node.column + node.row * 2) % 5 !== 2) continue;
    for (const [dx, dz] of [[1,2],[-1,2],[2,1],[-2,1],[3,0]]) {
      const column = node.column + dx;
      const row = node.row + dz;
      if (column < 0 || column >= columns || row >= rows) continue;
      const other = row * columns + column;
      const a = Math.min(node.id, other), b = Math.max(node.id, other);
      if (!known.has(`${a}:${b}`)) { possible.push({a,b}); known.add(`${a}:${b}`); }
    }
  }
  return { columns, rows, nodes, possible };
}

/** Shared quadratic control point keeps Canvas and the static SVG in agreement. */
export function connectionControl(a: {x:number;y:number}, b: {x:number;y:number}, edge: FieldEdge) {
  const bend = (((edge.a * 17 + edge.b * 13) % 7) - 3) * .027;
  return { x: (a.x + b.x) / 2 - (b.y - a.y) * bend, y: (a.y + b.y) / 2 + (b.x - a.x) * bend };
}

/** Each 2×2 face changes between two matchings. Old edges fully disappear before new edges appear. */
export function matchingAt(field: Field, elapsed: number): MatchingEdge[] {
  const edges: MatchingEdge[] = [];
  for (let row = 0; row < field.rows; row += 2) {
    for (let column = 0; column < field.columns; column += 2) {
      const a = row * field.columns + column;
      const b = a + 1;
      const c = a + field.columns;
      const d = c + 1;
      const horizontal = [{ a, b }, { a: c, b: d }];
      const vertical = [{ a, b: c }, { a: b, b: d }];
      const finalHorizontal = (column / 2 + row / 2) % 3 !== 1;
      const from = finalHorizontal ? vertical : horizontal;
      const to = finalHorizontal ? horizontal : vertical;
      const arrival = 2100 + column * 70 + row * 90;
      const show = smooth((elapsed - arrival) / 850);
      const change = smooth((elapsed - 4200 - column * 55 - row * 45) / 1100);
      const oldOpacity = show * (1 - smooth(change * 2));
      const newOpacity = show * smooth(change * 2 - 1);
      if (oldOpacity > .001) edges.push(...from.map(edge => ({ ...edge, opacity: oldOpacity })));
      if (newOpacity > .001) edges.push(...to.map(edge => ({ ...edge, opacity: newOpacity })));
    }
  }
  return edges;
}

export function projectNode(node: FieldNode, elapsed: number, width: number, height: number) {
  const localProgress = easeOut((elapsed - node.seed * 650) / 3100);
  const settled = easeOut(elapsed / INTRO_DURATION);
  const yaw = -.12 + (1 - settled) * .10;
  const mobile = width < 640;
  const pitch = (mobile ? .73 : 1.035) + (1 - settled) * .055;
  const scatter = 1 - localProgress;
  const x = node.x + Math.sin(node.id * 1.73) * 165 * scatter;
  const z = node.z + Math.cos(node.id * 2.17) * 155 * scatter;
  const elevation = (70 + node.seed * 245) * scatter + Math.sin(node.column * .38 + node.row * .43) * 11;
  const rx = x * Math.cos(yaw) + z * Math.sin(yaw);
  const rz = -x * Math.sin(yaw) + z * Math.cos(yaw);
  const depth = rz * Math.sin(pitch) - elevation * Math.cos(pitch);
  const perspective = 1180 / (1180 + depth);
  const scale = Math.min(width / (mobile ? 1120 : 1270), 1.42);
  const sy = -rz * Math.cos(pitch) - elevation * Math.sin(pitch);
  return { x: width / 2 + rx * perspective * scale, y: height * (mobile ? .5 : .55) + sy * perspective * scale * (mobile ? 1.38 : 1), scale: perspective * scale, depth, arrival: localProgress };
}
