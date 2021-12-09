const [n, k] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `7 3`
)
  .trim()
  .split(" ")
  .map(Number);

console.log(n, k);

let arr = [];
let answers = [];
for (let i = 1; i < n + 1; i++) {
  arr.push(i);
}

let index = 0;
while (arr.length > 0) {
  index += k - 1;
  if (index >= arr.length) {
    index %= arr.length;
  }
  let answer = arr[index];
  arr.splice(index, 1);
  answers.push(answer);
}

console.log("<" + answers.join(", ") + ">");
