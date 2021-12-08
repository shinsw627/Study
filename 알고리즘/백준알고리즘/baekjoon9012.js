const fs = require("fs");
const inputData = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `0`
)
  .trim()
  .split("\n");

for (let i = 1; i < Number(inputData[0]) + 1; i++) {
  let count = 0;

  let inputDataArray = inputData[i].split("");
  for (let j = 0; j < inputDataArray.length; j++) {
    if (count < 0) {
      break;
    } else if (inputDataArray[j] === "(") {
      count++;
    } else if (inputDataArray[j] === ")") {
      count--;
    }
  }

  if (count === 0) {
    console.log("YES");
  } else {
    console.log("NO");
  }
}
