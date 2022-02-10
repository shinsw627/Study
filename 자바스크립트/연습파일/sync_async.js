// setTimeout(function () {
//   console.log("셋타임아웃", Date.now());
// }, 0);
// setTimeout(function () {
//   console.log("셋타임아웃 2", Date.now());
// }, 2000);
// setTimeout(function () {
//   console.log("셋타임아웃 3", Date.now());
// }, 1000);

// Promise.resolve().then(function () {
//   console.log("프로미스", Date.now());
//   setTimeout(function () {
//     console.log("프로미스 - 셋타임아웃", Date.now())

//   }, 0)
//   console.log("프로미스2", Date.now())
// });

// function timeout(ms, a) {
//   return new Promise((resolve) => setTimeout(function (resolve){
//     a = "async 2"
//     return console.log(ms/1000,'초 타임아웃 끝', Date.now()), a
//   }, ms))
// }

// async function Async () {
//   let a = "async 1"
//   console.log(a)
//   await timeout(0)
//   console.log(a, "async a 끝")
//   return console.log(a,"async await 끝")
// }

// Async()

// console.log("시작", Date.now());
// for (let i = 0; i < 10000000; i++) {
//   if (i === 9999999) {
//     console.log("for문 끝", Date.now());
//   }
// }

// console.log("동기 마지막", Date.now());

// function asdf(count, team, work) {
//   count < 3 ? team() : work();
// }

// function team() {
//   console.log("aa", "bb", "cc");
// }
// function work() {
//   console.log("node공부");
// }

// asdf(2, setTimeout(team, 2000), setTimeout(work, 4000));

// const a = new Promise((resolve, reject) => {
//   resolve(Date.now());
// });
// console.log(1);
// console.log(a);
// a.then((result) => {
//   console.log(result);
// });

// console.log(2);

console.log(1, Date.now());

console.log(2, Date.now());
for (let i = 0; i < 1000000; i++) {}
console.log(3, Date.now());

console.log(1, Date.now());
setTimeout(() => console.log(2, Date.now()), 1000);
console.log(3, Date.now());
