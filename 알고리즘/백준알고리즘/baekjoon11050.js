const fs = require("fs");
const [n, k] = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 2`
)
  .trim()
  .split(" ");

function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    let result = 1;
    for (i = 1; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}

console.log(factorial(n) / (factorial(k) * factorial(n - k)));
