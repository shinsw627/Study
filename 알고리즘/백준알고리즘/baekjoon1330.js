const fs = require("fs");
const inputData = fs.readFileSync(0, "utf8").toString().split(" ");

const A = parseInt(inputData[0]);
const B = parseInt(inputData[1]);
let answer;

if (A - B > 0) {
  answer = ">";
} else if (A - B < 0) {
  answer = "<";
} else {
  answer = "==";
}

console.log(answer);
