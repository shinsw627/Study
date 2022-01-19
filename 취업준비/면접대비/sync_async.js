console.log("시작", Date.now());
for (let i = 0; i < 10000000; i++) {
  if (i === 9999999) {
    console.log("for문 끝", Date.now());
  }
}

setTimeout(function () {
  console.log("셋타임아웃", Date.now());
}, 0);

Promise.resolve().then(function () {
  console.log("프로미스", Date.now());
});
console.log("동기 마지막", Date.now());
