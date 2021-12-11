const input = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `00009-00009`
)
  .trim()
  .split(/[\-]/);

const arr = input.map((v) =>
  v
    .split("+")
    .map(Number)
    .reduce((a, b) => a + b)
);

console.log(arr.reduce((a, b) => (a -= b)));
