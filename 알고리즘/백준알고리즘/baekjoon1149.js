const [[n], ...input] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `8
71 39 44
32 83 55
51 37 63
89 29 100
83 58 11
65 13 15
47 25 29
60 66 19`
)
  .trim()
  .split("\n")
  .map((n) => n.split(" ").map(Number));
let dp = [...new Array(n + 1)].map((v) => new Array(3).fill(0));
dp[1] = input[0];

// dp는 답의 동적 변화를 계속 담아가는 추적배열?
for (let i = 2; i <= n; i++) {
  dp[i][0] = input[i - 1][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
  dp[i][1] = input[i - 1][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
  dp[i][2] = input[i - 1][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
}
console.log(Math.min(...dp[n]));
