const [[n], [...input]] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `14
14 26456 2 28 13228 3307 7 23149 8 6614 46298 56 4 92596`
)
  .trim()
  .split("\n")
  .map((n) => n.split(" ").map((item) => parseInt(item)));

input.sort(function (a, b) {
  return a - b;
});

let answer = input[0] * input[input.length - 1];

console.log(answer);
