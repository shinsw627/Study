const fs = require("fs");
const inputData =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n").map(String)
    : ["2", "6 12 10", "30 50 72"];
let H;
let W;
let N;
let x;
let y;

for (let i = 1; i < Number(inputData[0]) + 1; i++) {
  H = Number(inputData[i].split(" ")[0]);
  W = Number(inputData[i].split(" ")[1]);
  N = Number(inputData[i].split(" ")[2]);

  x = Math.ceil(N / H);
  y = N % H;

  if (y === 0) {
    console.log(H * 100 + x);
  } else {
    console.log(y * 100 + x);
  }
}
