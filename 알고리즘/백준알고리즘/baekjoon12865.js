let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const [n, m] = input
  .shift()
  .split(" ")
  .map((v) => +v);
const items = input.map((v) => v.split(" ").map((v) => +v));

// 물건 번호 맞추기 위해 맨 앞에 null 넣음
items.unshift(undefined);

// maxValueSum[n][k]: n번까지의 물건들 중 몇 개를 골라,
// 그 무게 합이 k 이하인 경우들 각각의 가치 합 중 최댓값
const maxValueSum = [];
for (let i = 0; i <= n; i++) {
  maxValueSum.push(Array(m + 1).fill(0));
}

for (let i = 1; i <= n; i++) {
  const [weight, value] = items[i];

  for (let k = 0; k <= m; k++) {
    if (k < weight) {
      maxValueSum[i][k] = maxValueSum[i - 1][k];
    } else {
      maxValueSum[i][k] = Math.max(
        maxValueSum[i - 1][k], // n번 물건 안 담는 경우
        maxValueSum[i - 1][k - weight] + value // n번 물건 담는 경우
      );
    }
  }
}

console.log(maxValueSum[n][m]);

// const dp = new Array(n).fill(0);

// for (let i = 0; i < dp.length; i++) {
//   dp[i] = new Array(k + 1).fill(0);
// }

// for (let i = 1; i < dp.length; i++) {
//   const weight = input[i][0];
//   const value = input[i][1];

//   for (let j = 1; j <= k; j++) {
//     if (j - weight < 0) {
//       dp[i][j] = dp[i - 1][j];
//     } else {
//       dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight] + value);
//     }
//   }
// }

// console.log(Math.max(...dp[dp.length - 1]));
