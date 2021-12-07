const fs = require("fs");
const inputData = fs.readFileSync("/dev/stdin").toString().split(' ').map(Number);

const Max = 1000000
let M = inputData[0];
let N = inputData[1];
let isPrimeArr = new Array(N+1)
let square = 0;

isPrimeArr.fill(true)
isPrimeArr[0] = isPrimeArr[1] = false;


for (let i = 2; i < N+1; i++) {
    if(isPrimeArr[i]) {
        if(parseInt(Math.pow(i,2)) > Max) {
            break;
        } else {
            for (square = parseInt(Math.pow(i, 2)); square < N + 1) {
                isPrimeArr[square] = false;
                square += i;
            }
        }
    }
}

for (let i = M; i < N + 1; i++) {
    if(isPrimeArr[i]) {
        console.log(i)
    }
}