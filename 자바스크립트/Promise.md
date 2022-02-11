## Promise

콜백함수에서 설명했듯이 비동기함수 처리과정에서 콜백지옥의 가독성저하 문제를 해결하기 위해 등장한 것이 Promise이다.

### Promise란

promise란 간단히 말하면 Javascript 비동기 처리에 사용되는 객체이다.

> Promise 부분에서는 캡틴판교님의 Promise글이 너무 잘쓰여져 있어서 거의 완전히 비슷합니다. 아래의 링크를 참고해주세요
> https://joshua1988.github.io/web-development/javascript/promise-for-beginners/

비동기 통신의 간단한 예를 들어서 설명해 보겠다.
먼저 간단한 ajax 통신 코드이다.

```js
function getData(callbackFunc) {
  $.get("url 주소/products/1", function (response) {
    callbackFunc(response); // 서버에서 받은 데이터 response를 callbackFunc() 함수에 넘겨줌
  });
}

getData(function (tableData) {
  console.log(tableData); // $.get()의 response 값이 tableData에 전달됨
});
```

위 코드는 콜백함수를 이용해 제이쿼리의 ajax 통신 api를 통한 지정된 url에서 1번 상품 데이터를 받아오는 코드이다.

이 코드에 프로미스를 적용하면

```js
function getData(callback) {
  // new Promise() 추가
  return new Promise(function (resolve, reject) {
    $.get("url 주소/products/1", function (response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function (tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});
```

이런 코드가 된다.
아직 Promise를 모르기에 무슨 말인가 싶을 것이다.
걱정하지 마시라 아래에서 자세히 살펴보겠다.

### Promise의 3가지 상태(states)

프로미스를 사용할 때 알아야 하는 가장 기본적인 개념이 바로 프로미스의 상태(states)이다. 여기서 말하는 상태란 프로미스의 처리 과정을 의미한다.
new Promise()로 프로미스를 생성하고 종료될 때 까지 3가지의 상태를 갖는다.

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태

- Fulfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태

- Rejected(실패) : 비동기 처리가 실패하거나 오류가 발생한 상태

#### Pending(대기)

먼저 아래와 같이 new Promise() 메서드를 호출하면 대기(Pending) 상태가 된다.

```js
new Promise();
```

new Promise() 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 resolve, reject 이다.

```js
new Promise(function(resolve, reject) {
  // 로직...
```

#### Fulfilled(이행)

콜백 함수의 인자 resolve를 아래와 같이 실행하면 이행(Fulfilled) 상태가 됩니다.

```js
new Promise(function (resolve, reject) {
  resolve();
});
```

그리고 이행 상태가 되면 아래와 같이 then()을 이용하여 처리 결과 값을 받을 수 있다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    var data = 100;
    resolve(data);
  });
}

// resolve()의 결과 값 data를 resolvedData로 받음
getData().then(function (resolvedData) {
  console.log(resolvedData); // 100
});
```

#### Rejected(실패)

new Promise()로 프로미스 객체를 생성하면 콜백 함수 인자로 resolve와 reject를 사용할 수 있다고 했는데 여기서 reject를 호출하면 실패(Rejected) 상태가 된다.

```js
new Promise(function (resolve, reject) {
  reject();
});
```

그리고 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 catch()로 받을 수 있다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    reject(new Error("Request is failed"));
  });
}

// reject()의 결과 값 Error를 err에 받음
getData()
  .then()
  .catch(function (err) {
    console.log(err); // Error: Request is failed
  });
```

처리 흐름을 그림으로 나타내면 다음과 같다.

![](https://images.velog.io/images/shinsw627/post/5035017e-8539-4308-ba58-ae2919fea16f/image.png)

이제 위에서의 예제를 통해 설명해 보겠다.

```js
function getData() {
  return new Promise(function (resolve, reject) {
    $.get("url 주소/products/1", function (response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData()
  .then(function (data) {
    console.log(data); // response 값 출력
  })
  .catch(function (err) {
    console.error(err); // Error 출력
  });
```

서버에서 제대로 응답을 받아오게 되면 resolve() 메서드를 호출하고, 응답이 없다면 reject() 메서드를 호출하게 된다. 호출된 메서드에 따라 then()이나 catch()로 분기하여 응답 결과 또는 오류를 출력한다.

#### 여러 개의 프로미스 연결하기 (Promise Chaining)

콜백함수의 연결처럼 프로미스도 여러개의 프로미스를 연결하여 사용할 수 있다. 이번엔 setTimeout을 사용한 예제를 들어보겠다.

```js
new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1);
  }, 2000);
})
  .then(function (result) {
    console.log(result); // 1
    return result + 10;
  })
  .then(function (result) {
    console.log(result); // 11
    return result + 20;
  })
  .then(function (result) {
    console.log(result); // 31
  });
```

위 코드는 프로미스 객체를 하나 생성하고 setTimeout() 을 이용해 2초 후에 resolve()를 호출하는 예시이다.

resolve()가 호출되면 프로미스가 대기 상태에서 이행상태로 넘거가기 때문에 첫 번째 .then()의 로직으로 넘어가게된다. 첫 번째 .then()에서는 이행된 결과 값 1을 받아서 10을 더한후 그 다음 .then()으로 넘겨준다. 두 번째 .then()에서도 마찬가지로 바로 이전 프로미스의 결과 값 11을 받아서 20을 더하고 다음 .then()으로 넘겨준다. 마지막 .then()에서 최종 결과 값 31을 출력하게 된다.

그렇다면 앞에서 배운 콜백함수와 비교해 보자
우선 콜백함수의 코드이다.

```js
const addFive = (number, callback) => {
  setTimeout(() => {
    callback(number + 5), 1000;
  });
};
const addSix = (number, callback) => {
  setTimeout(() => {
    callback(number + 6), 1000;
  });
};
const addSeven = (number, callback) => {
  setTimeout(() => {
    callback(number + 7), 1000;
  });
};

const log = (number) => {
  console.log(number);
};

addFive(0, (number) => {
  addSix(number, (number) => {
    addSeven(number, log);
  });
});
```

복잡해 보이지만 위 코드를 설명하면 1초간격으로 addFive -> addSix -> addSeven이 실행되고 console.log로 출력하는 코드이다.

이것을 Promise로 표현하면

```js
const addFive = (number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(number + 5);
    }, 1000)
  );

const addSix = (number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(number + 6);
    }, 1000)
  );

const addSeven = (number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(number + 7);
    }, 1000)
  );

const log = (number) =>
  new Promise((resolve) => setTimeout(() => console.log(number), 1000));

addFive(0)
  .then((number) => addSix(number))
  .then((number) => addSeven(number))
  .then((number) => log(number));
```

이렇게 된다.
코드 길이는 길어졌지만
then절을 붙여서 사용함으로서 가독성이 올라간 것을 볼 수 있다.

지금까지의 예제들은 너무 억지로 만들어진 예라는 느낌이 있었다. 실무에 있을 법한 예를 들어보겠다.

#### 실무에서 있을 법한 프로미스 연결 사례

실제 웹 서비스에서 있을 법한 사용자 로그인 인증 로직에 프로미스를 여러 개 연결해 보겠다.

```js
getData(userInfo).then(parseValue).then(auth).then(diaplay);
```

위 코드는 페이지에 입력된 사용자 정보를 받아와 파싱, 진증 등의 작업을 거치는 코드를 나타내었다. 여기서 userInfo는 사용자 정보가 담긴 객체를 의미하고, parseValue, auth, display는 각각 프로미스를 반환해주는 함수라고 가정했다.

```js
var userInfo = {
  id: "test@abc.com",
  pw: "****",
};

function parseValue() {
  return new Promise({
    // ...
  });
}
function auth() {
  return new Promise({
    // ...
  });
}
function display() {
  return new Promise({
    // ...
  });
}
```
