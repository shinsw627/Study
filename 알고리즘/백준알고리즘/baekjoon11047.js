const [nK, ...input] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `10 66553
1
5
10
50
100
500
1000
5000
10000
50000`
)
  .trim()
  .split("\n");
let count = 0;
let [n, k] = nK.split(" ").map(Number);
let inputData = input.map(Number);

for (let i = n - 1; i >= 0; i--) {
  while (true) {
    if (inputData[i] > k) {
      break;
    }
    if (inputData[i] <= k) {
      k -= inputData[i];
      count++;
    }
  }
  if (k === 0) {
    break;
  }
}

console.log(count);
