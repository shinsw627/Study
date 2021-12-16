const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
0
4
10`
)
  .trim()
  .split("\n")
  .map(Number);

const n = input.shift();

for (let i = 0; i < n; i++) {
  let oneCount = 0;
  let zeroCount = 1;

  for (let j = 1; j <= input[i]; j++) {
    const tmpCount = zeroCount;

    zeroCount = oneCount;
    oneCount += tmpCount;
  }

  console.log(zeroCount + " " + oneCount);
}

let dp = new Array(41);

function fibonacci(n) {
  if (n <= 0) {
    dp[0] = 0;
  } else if (n === 1) {
    dp[1] = 1;
    return 1;
  }
  if (dp[n] !== 0) {
    return dp[n];
  } else {
    return (dp[n] = fibonacci(n - 1) + fibonacci(n - 2));
  }
}

let test;
