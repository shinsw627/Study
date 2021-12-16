const data = require("fs")
  .readFileSync("/dev/stdin", "utf8")
  .toString()
  .trim()
  .split("\n");

// target보다 크거나 같은 숫자가 나오는 위치(index)
const lowerBound = (target, array) => {
  let low = 0;
  let high = array.length - 1;
  while (low < high) {
    let mid = Math.floor((high + low) / 2);
    if (target <= array[mid]) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return high;
};

const n = Number(data[0]);
const A = data[1].split(" ").map(Number);

const LIS = [];

for (let i = 0; i < n; i++) {
  if (LIS.length === 0 || LIS[LIS.length - 1] < A[i]) {
    LIS.push(A[i]);
  } else {
    LIS[lowerBound(A[i], LIS)] = A[i];
  }
}

console.log(LIS.length);
