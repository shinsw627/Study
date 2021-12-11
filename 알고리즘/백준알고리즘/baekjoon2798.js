const [[n, m], [...input]] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `10 500
93 181 245 214 315 36 185 138 216 295`
)
  .trim()
  .split("\n")
  .map((n) => n.split(" ").map((item) => parseInt(item)));
let max = 0;

for (let i = 0; i < n - 2; i++) {
  for (let j = i + 1; j < n - 1; j++) {
    for (let k = j + 1; k < n; k++) {
      if (
        input[i] + input[j] + input[k] > max &&
        input[i] + input[j] + input[k] <= m
      ) {
        max = input[i] + input[j] + input[k];
      }
    }
  }
}

console.log(max);
