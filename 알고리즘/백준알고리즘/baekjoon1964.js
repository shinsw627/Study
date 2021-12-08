const fs = require("fs");
const inputData =
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : ``;

const N = inputData;
let answer = 5;
for (let i = 2; i <= N; i++) {
  answer += 3 * i + 1;
}
answer %= 45678;
console.log(answer);
