const fs = require("fs");
const inputData = fs
  .readFileSync("/dev/stdin")
  .toString()
  .split("\n")
  .map(Number);

//최대값을 구해서
const max = Math.max(...inputData) * 2;

//담을 배열
let prime = [];

//최대값만큼 자연수 i 마다 true 전부 담아서
for (let i = 0; i <= max; i++) {
  prime.push(true);
}
//0 1은 소수 아니고
prime[0] = false;
prime[1] = false;

//소수아닌거 제외
for (let i = 2; i * i <= max; i++) {
  if (prime[i]) for (let j = i * i; j <= max; j += i) prime[j] = false;
}

//범위 내에 소수 갯수 세기
inputData.forEach((v) => {
  const start = v;
  const end = v * 2;
  if (v > 0) {
    let cnt = 0;
    for (let i = start + 1; i <= end; i++) {
      if (prime[i] == true) {
        cnt++;
      }
    }
    console.log(cnt);
  }
});
