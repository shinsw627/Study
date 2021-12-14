const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `1 1 1
2 2 2
10 4 6
50 50 50
-1 7 18
-1 -1 -1`
)
  .trim()
  .split("\n")
  .map((m) => m.split(" ").map(Number));

let readlineIdx = 0;
const readInput = () => input[readlineIdx++];
const fillMax = 0;
let table = new Array(21);

function w(a, b, c) {
  if (a <= 0 || b <= 0 || c <= 0) {
    return 1;
  }

  if (a > 20 || b > 20 || c > 20) {
    return w(20, 20, 20);
  }

  if (table[a][b][c] !== fillMax) {
    return table[a][b][c];
  }

  if (a < b && b < c) {
    let t1 = (table[a][b][c - 1] = w(a, b, c - 1));
    let t2 = (table[a][b - 1][c - 1] = w(a, b - 1, c - 1));
    let t3 = (table[a][b - 1][c] = w(a, b - 1, c));
    return (table[a][b][c] = t1 + t2 - t3);
  }

  let t1 = (table[a - 1][b][c] = w(a - 1, b, c));
  let t2 = (table[a - 1][b - 1][c] = w(a - 1, b - 1, c));
  let t3 = (table[a - 1][b][c - 1] = w(a - 1, b, c - 1));
  let t4 = (table[a - 1][b - 1][c - 1] = w(a - 1, b - 1, c - 1));
  return (table[a][b][c] = t1 + t2 + t3 - t4);
}

for (let i = 0; i < 21; ++i) {
  table[i] = new Array(21);
  for (let j = 0; j < 21; ++j) {
    table[i][j] = new Array(21).fill(fillMax);
  }
}
while (true) {
  let [a, b, c] = readInput();
  a = Number(a);
  b = Number(b);
  c = Number(c);
  if (a === -1 && b === -1 && c === -1) break;
  console.log(`w(${a}, ${b}, ${c}) = ${w(a, b, c)}`);
}
