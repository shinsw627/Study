const fs = require("fs");
const inputData = fs.readFileSync("/dev/stdin").toString().split(" ");

const A = Number(inputData[0]);
const B = Number(inputData[1]);
let V = Number(inputData[2]);

console.log(Math.ceil((V - B) / (A - B)));
