const fs = require("fs");
const [n, ...input] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
6
20`
)
  .trim()
  .split("\n")
  .map(Number);
let targetNum;
for (let i = 0; i < n; i++) {
  let arr = [1, 1, 1, 2, 2];
  targetNum = input[i];
  if (input[i] === 1 || input[i] === 2 || input[i] === 3) {
    console.log(1);
  } else if (input[i] === 4 || input[i] === 5) {
    console.log(2);
  } else {
    for (let j = 4; j < targetNum; j++) {
      arr.push(arr[j] + arr[j - 4]);
    }
    console.log(arr[targetNum - 1]);
  }
}
