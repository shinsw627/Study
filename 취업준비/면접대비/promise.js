const promise = new Promise((res, rej) => {
  console.log("promise 자동시작");
  setTimeout(() => {
    // res("프로미스 결과");
    rej(new Error("no network"));
  }, 1000);
});

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  });
