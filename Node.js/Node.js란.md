# Node란?

**Node.js는 Chrome V8 Javascript 엔진으로 빌드된 Javascript 런타임이다.** - by node 공홈

런타임이란 특정 언어로 만든 프로그램을 실행할 수 있는 환경을 의미한다. 이전까지 Javascript는 웹 브라우저에서만 사용되는 스크립트 언어였지만, 구글의 성능 뛰어난 V8 엔진 출시로 속도 문제가 많이 해결되었고 그 결과로 **웹 브라우저 외의 환경에서 Javascript를 실행할 수 있는 프로그램이 개발되었고 그것이 Node.js이다.**
</br>

Node.js는 크게 3가지 특징을 가지고 있다.

- **싱글스레드 모델**
- **논 블로킹 I/O**
- **이벤트 기반**
  </br></br>

### 싱글스레드

스레드는 프로세스의 실행 흐름으로 Node.js라는 이름의 음식점이 있다고 가정할 때 싱글 스레드의 의미는 이 음식점의 종업원 수가 오직 한명이라는 뜻이라고 할 수 있다.

서버는 기본적으로 클라이언트의 request를 처리해줘야 하는데 Node.js 처럼 종업원이 한 명이라면 효율적으로 요청을 처리해 주지 못하는 것 아닐까? 정말 안좋을 것 처럼 느껴지는데 조금 더 알아보자

Node.js의 내부 구조를 보면, V8엔진 외에 libuv라는 라이브러리가 있는 것을 확인할 수 있다. 그리고 이 libuv 라이브러리가 Node.js의 특성인 이벤트 기반과 논 블로킹 I/O를 구현하고 있다.

![](https://images.velog.io/images/shinsw627/post/2046897d-7129-4b73-accc-47714ba63742/image.png)

</br></br>

### 논 블로킹 I/O(non-blocking I/O)

블로킹 이란, Node.js 프로세스에서 추가적인 Javascript의 실행을 위해 Javascript가 아닌 작업이 완료될 때까지 기다려야만 하는 상황이다.

반대로 논 블로킹은 추가적인 Javascript 실행을 위해 Javascript가 아닌 작업이 완료될 때까지 기다리지 않아도 되는 상황을 말한다.

```js
// 블로킹 예시
const fs = require("fs");
const data = fs.readFileSync("/file.md"); // 파일을 읽을 때까지 여기서 블로킹됩니다.
console.log(data);
moreWork();
// moreWork 는 console.log(data)가 실행되고 실행됩니다.
```

```js
// 논 블로킹 예시
const fs = require("fs");
fs.readFile("/file.md", (err, data) => {
  if (err) throw err;
  console.log(data);
});
moreWork();
// moreWork();는 console.log 이전에 실행될 것입니다.
```

위의 블로킹 예시에서는 file.md를 다 읽을 때까지 전체 JavaScript 시스템이 멈추지만, 아래 논 블로킹 예시에서는 비동기적으로 실행되기에 전체 JavaScript 시스템이 멈추지 않고 moreWork()가 먼저 실행된다. 그리고 file.md를 다 읽고 나서 fs.readFile의 두 번째 파라미터로 들어간 콜백(callback) 함수가 실행된다. 여기서 콜백 함수란 어떤 이벤트(이 경우에서는 file I/O)가 끝나고 나서 실행되는 함수를 말한다.

</br></br>
