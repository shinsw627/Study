const inputData = "3";

let N = Number(inputData);
let count;

if ([1, 2, 4, 7, 8].indexOf(N) !== -1) {
  count = -1;
} else {
  switch (N % 10) {
    case 1:
      count = (N - 6) / 5 + 2;
      break;
    case 2:
      count = (N - 12) / 5 + 4;
      break;
    case 3:
      count = (N - 3) / 5 + 1;
      break;
    case 4:
      count = (N - 9) / 5 + 3;
      break;
    case 5:
      count = N / 5;
      break;
    case 6:
      count = (N - 6) / 5 + 2;
      break;
    case 7:
      count = (N - 12) / 5 + 4;
      break;
    case 8:
      count = (N - 3) / 5 + 1;
      break;
    case 9:
      count = (N - 9) / 5 + 3;
      break;
    case 0:
      count = N / 5;
      break;
  }
}

console.log(count);
