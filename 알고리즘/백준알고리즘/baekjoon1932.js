const [[n], ...dp] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `5
7
3 8
8 1 0
2 7 4 4
4 5 2 6 5`
)
  .trim()
  .split("\n")
  .map((m) => m.split(" ").map(Number));

for (let i = 1; i < n; i++) {
  for (let j = 0; j < dp[i].length; j++) {
    if (j === 0) {
      dp[i][j] += dp[i - 1][j];
    } else if (j === dp[i].length - 1) {
      dp[i][j] += dp[i - 1][j - 1];
    } else {
      dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
    }
  }
}

console.log(Math.max(...dp[n - 1]));
