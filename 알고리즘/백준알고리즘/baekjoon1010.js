const [[t], ...input] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `3
2 2
1 5
13 29`
)
  .trim()
  .split("\n")
  .map((t) => t.split(" ").map(Number));

function factorial(x) {
  if (x <= 1) {
    return 1;
  } else {
    return factorial(x - 1) * x;
  }
}
let n = 0;
let m = 0;
for (let i = 0; i < t; i++) {
  [n, m] = input[i];
  console.log(Math.round(factorial(m) / (factorial(m - n) * factorial(n))));
  console.log(factorial(m) / (factorial(m - n) * factorial(n)));
}
