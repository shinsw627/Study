const n = parseInt(
  (process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `99`
  ).trim()
);

let max = n - (Math.floor(Math.log10(n)) + 1) * 9;

let m = 0;
if (max < 0) {
  max = 0;
}
for (let i = max; i < n; i++) {
  if (
    i
      .toString()
      .split("")
      .map((n) => parseInt(n))
      .reduce((a, b) => a + b, 0) +
      i ===
    n
  ) {
    m = i;
    break;
  }
}

console.log(m);
