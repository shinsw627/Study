const fs = require("fs");
const [min, max] =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split(" ").map(Number)
    : `3 16`.split(" ").map(Number);

const primes = Array(max + 1).fill(true);

primes[0] = false;
primes[1] = false;

for (let i = 2; i ** 2 <= max; i++) {
  if (primes[i]) {
    for (let j = i ** 2; j <= max; j += i) {
      primes[j] = false;
    }
  }
}

for (let i = min; i <= max; i++) {
  if (primes[i]) {
    console.log(i);
  }
}
