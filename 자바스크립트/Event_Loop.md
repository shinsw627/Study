## Event Loop

앞서) 해당 글은 우리밋님의 유튜브 영상을 토대로 만들었습니다. 정말 좋은 영상이니 꼭 확인 바랍니다.
https://youtu.be/QFHyPInNhbo
https://www.youtube.com/watch?v=S1bVARd2OSE

![Javascript 엔진의 구조 v8](https://images.velog.io/images/shinsw627/post/6f7035b5-f72a-477f-a438-8434de561dcc/image.png)

위 그림은 Javascript 엔진의 구조이다.
간단히 용어들에 대해 설명하자면

Memory Heap
메모리 할당이 일어나는 곳

Heap
구조화되지 않은 넓은 메모리 영역 -> 객체(변수, 함수 등)들이 담긴다.

Call Stack (호출 스택)
실행될 코드의 한 줄 단위로 할당된다.

Web APIs (노드에서는 백그라운드로 설명된다)
비동기 처리를 담당한다.

Callback Queue (Task Queue, Event Queue 등 다양한 형태로 설명된다)
비동기 처리가 끝난 후 실행되어야 할 콜백 함수가 차례로 할당된다.

Event Loop
Queue에 할당된 함수를 순서에 맞춰 Call Stack에 할당해준다.

우선 동기적인 코드의 동작을 보겠다.

![](https://images.velog.io/images/shinsw627/post/4758c072-fa4c-4a9b-8a49-1f9b017647b4/image.png)

왼쪽의 코드는 실행되면 오른쪽과 같이 call stack에 담기게 된다. 그러면 위에서 부터 순차적으로 진행이 되어 콘솔을 출력하고 second() 함수를 만나 callstack에 console.log("두 번째")가
![](https://images.velog.io/images/shinsw627/post/52d477ad-a792-4e7d-8996-1b0ece98604a/image.png)
위 그림과 같이 쌓이게되고
콘솔 출력후 같은 방식으로 first()에 들어가 진행될 것이고 결과는
![](https://images.velog.io/images/shinsw627/post/cc820a1e-a71c-4109-a8ec-5118e368a222/image.png)
세번째 두번째 첫번째 세번째 이렇게 출력이 될 것이다.

그렇다면 이제 본격적으로 비동기적인 코드를 살펴보겠다.

```js
console.log("시작");

setTimeout(function () {
  console.log("중간");
}, 3000);

console.log("끝");
```

위 의 코드 결과가
![](https://images.velog.io/images/shinsw627/post/3df12278-3365-473c-904d-cd51ea3c9d28/image.png)
이렇게 나온다는 것은 이제 너무 잘 알 것이다.

그렇다면 javascript 동작 원리를 살펴보자
비동기적 코드는 callstack 만으로 해결할 수 없다.
아래의 그림을 보자

![](https://images.velog.io/images/shinsw627/post/2c1d557a-b37a-4989-9470-64cb1571e352/image.png)

처음에 이렇게 시작이라는 콘솔이 callstack에 담기게 되고 그후에 비동기적 코드인 setTimeout을 만나게 된다. 그러면

![](https://images.velog.io/images/shinsw627/post/1427aa5c-235a-4d5a-96ad-bd5a0e5032ec/image.png)

위 그림과 같이 console에는 "시작" callstack에는 setTimeout이 담기게 되는데 이는 비동기작업 이므로 브라우저에서는 Web API 혹은 node에선 background로 넘어가게된다.

![](https://images.velog.io/images/shinsw627/post/7cc22da5-c5a1-4f17-9913-df180612a7e1/image.png)
이렇게 되면 현재 web api에서는 3초가 흐르고 있을것이고 그다음 콜스택에는 console.log("끝")이 실행되어 console에는
![](https://images.velog.io/images/shinsw627/post/eac34ee7-7cb5-4e28-b057-87a674400236/image.png)
그림과 같이 "끝"이 출력되고
setTimeout의 3초가 다 지나게되면 그 안의 익명함수가 Callback Queue로 넘어가게 된다.
![](https://images.velog.io/images/shinsw627/post/2e3242af-2c1e-4977-8989-5572dbafc73f/image.png)

이렇게 setTimeout은 사라지고 Callback Queue에 담긴 익명함수는 이벤트루프(돌아가는 화살표로 표현하였다)에 의해
![](https://images.velog.io/images/shinsw627/post/33e79e8f-594d-4c6d-8de0-ce6c331b14c9/image.png)
이 그림과 같이 call stack이 비어있는 것을 확인하게 되면
Call Stack으로 다시 옮겨져 해당 함수가 실행되어 console.log("중간")이 call stack에 담기게된다.
![](https://images.velog.io/images/shinsw627/post/fea35bce-c6cf-4dbc-8ee6-c3434f3d33b8/image.png)
그 후엔
![](https://images.velog.io/images/shinsw627/post/0a0e85af-782f-4df0-be5c-b1587c823360/image.png)
이렇게 우리가 예상했던 결과인
시작
끝
중간
이 출력되는 것이다!
신기하지 않은가! 이제서야 자바스크립트 동작에 대해 조금은 알것 같아졌다.

그렇다면, 앞에 배웠던 Promise도 포함해서 조금 더 자세히 알아보자.

이번엔 아까의 예에서 Promise 하나만 추가해 보겠다.

```js
console.log("시작");

setTimeout(function () {
  console.log("중간");
}, 0);

Promise.resolve().then(function () {
  console.log("프로미스");
});

console.log("끝");
```

이것 또한 아까와 마찬가지로 console.log("시작")이 먼저 출력될것이고 setTimeout이 Web API로 들어가게 될것이다. 그림으로 표현하면

![](https://images.velog.io/images/shinsw627/post/4cf7d95c-c962-42b2-9e13-457ef8835e09/image.png)

이렇게 될 것이다.
아마 여기까진 잘 따라올 것으로 믿는다.
그 후에는

![](https://images.velog.io/images/shinsw627/post/0c1e0906-1b38-435e-8dec-c2fbe05783a4/image.png)

Promise가 Call stack으로 들어오게 되고 .then절이 Web API로 가게될 것이다.

![](https://images.velog.io/images/shinsw627/post/32681f37-ec8b-40e6-aefc-4251584423f2/image.png)

이렇게 될 것이다. 이번 예시에서는 setTimeout이 Promise보다 먼저 끝났다고 가정하고 진행하겠다.
그러면 Web API에 있던 비동기 작업이 끝나 그 콜백함수들이 Callback Queue에 순서대로 담길 것이다. 그것을 그림으로 나타내면

![](https://images.velog.io/images/shinsw627/post/621bdcc2-f73f-451d-8d51-96caabc007d3/image.png)

이렇게 될 것이다.
지금 상황에선 Event Loop는 Call Stack가 비어있는지 확인하고 비어있지 않기 때문에 작동하지 않는다.
그러면 이제 콘솔에 "끝"이 출력되고

![](https://images.velog.io/images/shinsw627/post/143da3e0-4ec2-40ec-aab1-584b0c6ae30a/image.png)

이렇게 Call Stack이 비게 된다 그러면 Event Loop에 의해 Callback Queue의 작업들이 Call Stack으로 옮겨지게 될 건데 여기가 약간 중요하다.
Queue 이므로 선입선출이라 setTimeout소속 콜백함수가 더 먼저 call stack으로 갈 것 같지만 그렇지 않다!
바로 우선순위가 있기 때문이다.
그 우선순위는 잠시 후에 다루도록 하겠다.

우선순위에 의해 then의 콜백함수가 먼저 Call Stack에 담겨

![](https://images.velog.io/images/shinsw627/post/69eb6d91-d887-46a8-b873-e598537b01d2/image.png)

이렇게 되고
콘솔에 프로미스가 출력이 된 후에

![](https://images.velog.io/images/shinsw627/post/ec2c552c-02f3-4e87-91ff-977b6885795a/image.png)

이렇게 setTimeout 익명함수가 담기게 되고

결과는

![](https://images.velog.io/images/shinsw627/post/05ed2699-361a-41f0-96ea-723410718263/image.png)

이렇게
시작
끝
프로미스
중간
이 되게 된다!

그렇다면 아까 말한 우선순위에 대해 알아보자.

사실상 우리가 보았던 Callback Queue는 조금 더 복잡하게 되어있다.

![](https://images.velog.io/images/shinsw627/post/8d6f867a-e3ff-437e-a885-6e67dbed3ecc/image.png)

이 그림이 되겠다.

Callback Queue 안에는 사실 Task Queue, Microtask Queue, AnimationFrames가 있다.

Task Queue에는 setTimeout이 담기게 되고, Microtask Queue에는 프로미스, Animation Frames에는 requestAnimationFrame이 담기게 된다

여기서 큐의 우선순위가 있게 되는데 항상 Microtask Queue > Animation Frames > Task Queue 순으로 진행되게 된다.

그러므로 후순위에 있는 Task Queue의 setTimeout의 함수는 Promise의 함수보다 더 늦게 실행된 것이다!

이렇게 이벤트 루프에 대해서 알아보았다.
