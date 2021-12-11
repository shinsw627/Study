const [[n], [...input]] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `5
1 24 234 1000 12`
)
  .trim()
  .split("\n")
  .map((m) => m.split(" ").map(Number));

input.sort((a, b) => {
  if (a > b) return 1;
  if (a === b) return 0;
  if (a < b) return -1;
});

let answer = 0;
let time = 0;

for (let i = 0; i < n; i++) {
  time += input[i];

  answer += time;
}
console.log(answer);
