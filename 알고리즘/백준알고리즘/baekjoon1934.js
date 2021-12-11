const [[n], ...input] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `3
1 45000
6 10
13 17`
)
  .trim()
  .split("\n")
  .map((m) => m.split(" ").map(Number));

for (let i = 0; i < n; i++) {
  let n;
  let a = input[i][0];
  let b = input[i][1];

  while (b !== 0) {
    n = a % b;
    a = b;
    b = n;
  }

  console.log((input[i][0] * input[i][1]) / a);
}
