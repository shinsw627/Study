const fs = require("fs");
const inputData = fs.readFileSync("/dev/stdin").toString();

let x = Math.floor(Number(inputData) / 10);
let y = Number(inputData) % 10;
let n = 0;
let c;
let newData;
while (Number(inputData) !== newData) {
  c = (x + y) % 10;
  newData = y * 10 + c;
  x = Math.floor(newData / 10);
  y = newData % 10;
  n++;
}
console.log(n);
