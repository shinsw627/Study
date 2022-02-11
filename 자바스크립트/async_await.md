### Async/Await

async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근 나온 문법으로 기존 비동기 처리방식인 콜백 함수와 프로미스의 단점을 보완하고 가독성을 더 올리게 도와준다.

#### 프로미스와 async 비교

프로미스를 보완했다고 하였는데 일단 비교를 통해 알아보겠다.
먼저 프로미스 코드다

```js
function fruit() {
  return new Promise((resolve, reject) => {
    resolve("banana");
  });
}

const pocket = fruit();
console.log(pocket);
// Promise {<fulfilled>: "banana"}
```

그 다음은 async를 사용한 코드이다.

```js
async function banana() {
  return "banana";
}
const pocket = banana();
console.log(pocket);
// Promise {<fulfilled>: "banana"}
```

위의 코드와 결과값이 같은 것을 볼 수 있다.

그렇다. 함수 앞에 async를 붙이기만 하면 리턴값이 promise 객체로 보내지게 된다.

우리가 new Promise로 만들고 resolve 쓰고 reject 쓰고 이런 귀찮은 일을 async 하나로 간단히 할 수 있다는 것이다!

### 그럼 await은?

await의 뜻은 기다리다. 즉, await은 비동기 처리를 동기적인 것 처럼 처리할 수 있게 해주는 코드이다!
await 또한 promise를 반환한다.

아래의 예제로 설명하겠다.

```js
const delay = (sec) => {
  return new Promise((resolve) => setTimeout(resolve, sec));
};

async function apple() {
  await delay(2000);
  return "apple";
}

async function banana() {
  await delay(1000);
  return "banana";
}

async function pickFruits() {
  const getapple = await apple();
  const getbanana = await banana();
  return `${getapple} + ${getbanana}`;
}

pickFruits().then(console.log);
// apple + banana
```

pickFruits가 호출되면 delay에 의해서 apple함수는 2초 banana함수는 1초 후에 값을 반환하게 되는데
await이 없다면 banana가 먼저 반환되고 apple이 그 다음에 반환되게 될 것이다. 하지만 await을 사용하여 동기처럼 값을 반환하기까지 기다리게 했으므로 순차적으로 값이 반환되게 된다!

이 예는 와닿지 않을 것 같아 실제로 쓸법한 예를 들어 설명해 보겠다.

```js
function fetchUser() {
  let url = "https://jsonplaceholder.typicode.com/users/1";
  return fetch(url).then(function (response) {
    return response.json();
  });
}

function fetchTodo() {
  let url = "https://jsonplaceholder.typicode.com/todos/1";
  return fetch(url).then(function (response) {
    return response.json();
  });
}
```

위 함수들을 실행하면 각각 사용자 정보와 할 일 정보가 담긴 프로미스 객체가 반환된다고 가정하겠다.

두 함수를 이용하여 실행하게 될 로직은 다음과 같다

1. fetchUser()를 이용하여 사용자 정보 호출
2. 받아온 사용자 아이디가 1이면 할 일 정보 호출
3. 받아온 할 일 정보의 제목을 콘솔에 출력

```js
async function logTodoTitle() {
  var user = await fetchUser();
  if (user.id === 1) {
    var todo = await fetchTodo();
    console.log(todo.title); // delectus aut autem
  }
}
```

**이처럼 비동기 처리 코드를 동기적인 사고형태로 쉽게 표현할 수 있으므로 가독성이 매우매우 올라간다!!**
콜백함수나 Promise를 사용했다면 코드길이도 엄청 길어지고 비교적 가독성이 떨어졌을 것이다.
