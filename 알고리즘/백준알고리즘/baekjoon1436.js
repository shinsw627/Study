const n = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `500`
).trim();

let count = 0;
let i = 665;

let numberN = Number(n);
while (true) {
  i++;
  if (String(i).split("666").length > 1) {
    count++;
  }
  if (count === numberN) {
    console.log(i);
    break;
  }
}
