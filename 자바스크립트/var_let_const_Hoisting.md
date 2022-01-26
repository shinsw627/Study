## 변수 선언

var는 변수 선언 방식에 있어서 큰 단점을 가지고 있다.
![](https://images.velog.io/images/shinsw627/post/ed07d6bf-1474-4324-a5d3-3a89f287f0f2/image.png)

![](https://images.velog.io/images/shinsw627/post/42ad89df-5565-4a01-a659-3403f256abc6/image.png)

변수를 한 번 더 선언해도 에러가 나지 않고 각기 다른 값이 출력된다.
이는 나중에 코드량이 많아지게 되면 중복선언으로 값이 바뀌거나 하는 문제가 생길 수 있다.

ES6 이후로 추가된 것이 let과 const 이다.

위의 코드에서 var 대신 let을 쓰게되면

![](https://images.velog.io/images/shinsw627/post/9ee1bbeb-f716-48dd-9df9-99112445939c/image.png)

![](https://images.velog.io/images/shinsw627/post/df985422-929b-4c45-aa9d-e0db8b49f8c7/image.png)

let은 재선언이 되지 않는다. (const도 마찬가지다)

그리고 let과 const의 차이는 변수의 재할당에 있다.

![](https://images.velog.io/images/shinsw627/post/f7d2d964-90d6-4af6-bb53-f3585f2fe161/image.png)

![](https://images.velog.io/images/shinsw627/post/7e11b20c-e71b-4485-b93e-914e4128f6c0/image.png)

let의 경우 변수의 재할당이 가능하다.

![](https://images.velog.io/images/shinsw627/post/835c0fab-dd7f-46ca-b8e2-1c0548bdc65e/image.png)

![](https://images.velog.io/images/shinsw627/post/02e2584b-a2a9-4271-b893-ee39971b1758/image.png)

const의 경우 변수의 재할당이 불가능하다. 정적인 상수의 경우 const를 사용하여 선언하면 되겠다.

## 스코프

var는 function-scoped 이고, let, const는 block-scoped 이다.

![](https://images.velog.io/images/shinsw627/post/2902b13c-7d4a-424c-bb7b-c4f2df1ff40e/image.png)

var는 함수스코프라 varTest에서 보는 바와 같이 재선언이 되는 것을 볼 수 있지만 let은 블록스코프라 다른 변수로 취급되어 다루어지는 것을 볼 수 있다.
var를 사용하면 혼동될 우려가 많다.

그렇다면 var는 재선언이 가능한 걸까?
var을 잘 사용하지 않는 이유를 더 자세히 알아보자
먼저 호이스팅의 개념을 먼저 짚고 가겠다.

## 호이스팅(Hoisting)의 개념

함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것을 말한다.

### 호이스팅이란

자바스크립트 함수는 실행되기 전에 함수 안에 필요한 변수값들을 모두 모아서 유효 범위의 최상단에 선언한다.
자바스크립트 Parser가 함수 실행 전 해당 함수를 한 번 훑는다.
함수 안에 존재하는 변수/함수선언에 대한 정보를 기억하고 있다가 실행시킨다.
유효 범위: 함수 블록 {} 안에서 유효
즉, 함수 내에서 아래쪽에 존재하는 내용 중 필요한 값들을 끌어올리는 것이다.
실제로 코드가 끌어올려지는 건 아니며, 자바스크립트 Parser 내부적으로 끌어올려서 처리하는 것이다.
실제 메모리에서는 변화가 없다.

자바스크립트는 ES6에서 도입된 let, const를 포함하여 모든 선언(var, let, const, function, function\*, class)을 호이스팅한다.

하지만, var 로 선언된 변수와는 달리 let 로 선언된 변수를 선언문 이전에 참조하면 참조 에러(ReferenceError)가 발생한다.

![](https://images.velog.io/images/shinsw627/post/9fb8ae2b-683b-4bab-bcec-faf4c8537175/image.png)

이는 let 로 선언된 변수는 스코프의 시작에서 변수의 선언까지 일시적 사각지대(Temporal Dead Zone; TDZ)에 빠지기 때문이다.

참고로, 변수는 선언 단계 > 초기화 단계 > 할당 단계 에 걸쳐 생성되는데

**var 으로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다.**

![](https://images.velog.io/images/shinsw627/post/355e40e0-5f9c-4286-ad5e-87fd2fbbbf59/image.png)

let 로 선언된 변수는 선언 단계와 초기화 단계가 분리되어 진행된다.
**선언 후에 초기화가 일어나므로 TDZ에 들어가게 되는것이다.**

![](https://images.velog.io/images/shinsw627/post/8e63a2c6-b704-4341-b06a-debb7da36227/image.png)

# 정리

![](https://images.velog.io/images/shinsw627/post/a8299387-adf3-498e-a624-bf9e86c82be9/image.png)

정리하자면 var은 변수 선언 전에 호이스팅이 일어나 변수선언과 초기화가 동시에 되어 TDZ의 영항을 받지 않는다. 여러 문제를 일으킬 우려가 있으므로 var의 사용은 피하는 것이 좋다.

일반적으로 변수선언은 const를 이용하되 재할당이 필요한 경우에만 let을 사용하는 것이 좋겠다.

참고
https://velog.io/@changchanghwang/%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85
https://velog.io/@bathingape/JavaScript-var-let-const-%EC%B0%A8%EC%9D%B4%EC%A0%90
https://80000coding.oopy.io/e1721710-536f-43f2-823b-663389f5fbfa
https://gist.github.com/LeoHeo/7c2a2a6dbcf80becaaa1e61e90091e5d
https://gmlwjd9405.github.io/2019/04/22/javascript-hoisting.html
