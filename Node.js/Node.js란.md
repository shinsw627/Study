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

### 이벤트 기반

위처럼 어떤 특정 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는 방식을 이벤트 기반(event-driven)이라고 한다. 즉 노드는 이벤트 기반 방식으로 동작하기 때문에, 어떤 이벤트가 발생하면 이벤트 리스너에 등록해둔 콜백(callback) 함수를 호출한다. 이때 이 호출할 콜백 함수들을 관리하고, 호출된 콜백 함수의 실행 순서를 결정하는 역할을 담당하는 것이 이벤트 루프(event-loop)이다.

</br>

![](https://images.velog.io/images/shinsw627/post/b0cc0ccf-d9ed-42e9-9b0c-1bd00a19df71/image.png)

이해하기 쉽게 그림을 통해 설명하자면(Node.js 런타임 말고 웹 브라우저 런타임 기준의 그림) JavaScript는 싱글 스레드 기반의 언어이기 때문에 단 한 개의 Call Stack을 가지고 있다. 따라서 이 Call Stack의 상태를 잘 유지해줘야 한다. 만일 엄청나게 시간이 오래 걸리는 연산이 Call Stack에서 돌아가고 있다면, 다른 JavaScript 코드들은 실행되지 못하고 블로킹(Blocking) 되어 있을 것이다. 따라서 블로킹을 일으키는 이벤트(DOM, AJAX 등)들은 Web APIs들을 통해 메인 스레드를 블로킹시키지 않고 비동기적(Asynchronous)으로 실행된다. 이 이벤트들은 모두 콜백(callback) 함수를 지니고 있는데, 콜백 함수는 특정 이벤트가 발생했을 때 수행되는 함수를 의미한다. 그리고 이 콜백 함수들은 백그라운드에서 이벤트 처리가 끝난 뒤 태스크 큐(Task Queue)에 순차적으로 쌓이게 되고, 이벤트 루프(Event Loop)는 Call Stack이 비어있을 때 태스크 큐에서 콜백을 꺼내 Call Stack에 올리는 역할을 수행한다.

또 여기서 하나 알아둬야 할 것이 사실 따지고 보면 Node.js 또한 따지고 보면 싱글 스레드가 아니라는 말이다.

Node.js 프로세스가 실행되면 내부적으로 스레드를 여러 개 생성한다. **하지만 이 중에서 우리가 직접 제어할 수 있는 스레드는 단 한 개이기 때문에 Node.js를 싱글 스레드라고 부른다.** 그리고 나머지 스레드들은 내부적으로 블로킹되는 작업들(file I/O, DB 등)을 수행하고, 그 콜백을 이벤트 루프에 등록한다.

이렇게 Node.js는 새로운 스레드를 생성하거나 멀티 스레드를 관리하는 데 필요한 작업(lock)을 수행하지 않아도 되기에 다른 언어에 비해 적은 오버헤드를 가지고 있고, 확장성이 크며 개발하기가 쉽다. 다만 블로킹 때문에 CPU 연산을 많이 요구하는 작업에는 적합하지 않다는 단점을 지니고 있다.

Node의 장단점 정리
![](https://images.velog.io/images/shinsw627/post/c7b7dfc2-b0b3-4f7a-8c6b-5a6bb536b8d5/image.png)

참고 글(출처)
https://blog.naver.com/yse1030/222503776596
https://nodejs.org/ko/docs/guides/blocking-vs-non-blocking/
https://buyandpray.tistory.com/81
https://blog.naver.com/wjdeh313/222521239332
