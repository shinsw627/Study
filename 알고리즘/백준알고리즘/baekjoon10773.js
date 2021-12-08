const fs = require("fs");
const inputData = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
1
3
5
4
0
0
7
0
0
6`
)
  .trim()
  .split("\n")
  .map(Number);
let answer = 0;
let array = [];
for (let i = 1; i < inputData[0] + 1; i++) {
  if (inputData[i] !== 0) {
    array.push(inputData[i]);
  } else {
    array.pop();
  }
}

for (let i = 0; i < array.length; i++) {
  answer += array[i];
}
console.log(answer);
