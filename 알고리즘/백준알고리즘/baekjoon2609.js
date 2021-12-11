const input = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `24 18`
)
  .trim()
  .split("\n")
  .map(Number);

input.sort(function (a, b) {
  return a - b;
});

let n = 0;

let a = input[0];
let b = input[1];

while (b !== 0) {
  n = a % b;
  a = b;
  b = n;
}
console.log(a);
let c = (input[0] * input[1]) / a;
console.log(c);
