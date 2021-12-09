const [n, m, ...arr] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `10 3
2 9 5`
)
  .trim()
  .split(/\s/)
  .map((v) => +v);

let numbers = [];
let count = 0;

for (let i = 1; i < n + 1; i++) {
  numbers.push(i);
}

let target;
let index;
for (let i = 0; i < m; i++) {
  target = arr[i];
  index = numbers.indexOf(target);
  if (numbers.length / 2 >= index) {
    while (true) {
      if (target == numbers[0]) {
        numbers.shift();
        break;
      } else {
        numbers.push(numbers[0]);
        numbers.shift();
        count++;
      }
    }
  } else {
    while (true) {
      if (target == numbers[0]) {
        numbers.shift();
        break;
      } else {
        numbers.unshift(numbers[numbers.length - 1]);
        numbers.pop();
        count++;
      }
    }
  }
}
console.log(count);
