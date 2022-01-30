setTimeout(function () {
  console.log("셋타임아웃", Date.now());
}, 0);
setTimeout(function () {
  console.log("셋타임아웃 2", Date.now());
}, 2000);
setTimeout(function () {
  console.log("셋타임아웃 3", Date.now());
}, 1000);

Promise.resolve().then(function () {
  console.log("프로미스", Date.now());
  setTimeout(function () {
    console.log("프로미스 - 셋타임아웃", Date.now())
    
  }, 0)
  console.log("프로미스2")
});

function timeout(ms) {
  return new Promise((resolve) => setTimeout(function (resolve){
    return console.log(ms/1000,'초 타임아웃 끝', Date.now())
  }, ms))
}


async function Async () {
  let a = "async 1"
  console.log(a)
  await timeout(1000)
  console.log(a, "async a 끝")
  return console.log("async 끝")
}

Async()

console.log("시작", Date.now());
for (let i = 0; i < 10000000; i++) {
  if (i === 9999999) {
    console.log("for문 끝", Date.now());
  }
}


console.log("동기 마지막", Date.now());
