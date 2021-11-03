# TIL 20211103 Hoisting

자바스크립트 개발자들은 `var` 키워드를 사용해 변수를 선언하면 안된다고 한다.
다들 이렇게 말하는 이유는 Hoisting(이하 호이스팅) 때문이다.

그러면 `const`, `let`은 호이스팅의 대상이 아니기 때문에 괜찮은걸까?
이것을 자세히 알아보기 전에 호이스팅이 일어나면 어떤 상황이 발생하는지 예시를 통해 살펴보자.

## 호이스팅 발생 예시

### 선언되지 않은 변수를 참조하는 경우: 호이스팅 X

```jsx
console.log(typeof variable); // 출력: undefined

console.log(variable); // 출력: ReferenceError: variable is not defined

const variable = 'Test';
```

선언되지 않은 변수의 타입은 항상 `undefined` 이며, 이러한 변수를 참조하는 순간 `ReferenceError` 라는 이름의 에러가 발생한다.

### 선언되지 않은 변수를 참조하는 경우: 호이스팅 O

```jsx
console.log(typeof variable); // 출력: undefined

console.log(variable); // 출력: undefined

var variable = 'Test';
```

아직 선언되지 않은 변수를 참조해도 undefined를 뱉을 뿐, 예상했던 참조 에러가 발생하지 않는다.
이렇듯 예상한것과 다르게 동작하는 순간 개발자의 코드는 어딘가 잘못 되어갈 가능성이 매우 높으며, 호이스팅 된 변수의 내용이 같은 이름을 사용하는 다른 코드에 의해 의도치 않게 변경되어 아주 힘든 디버깅 시간을 보내게 될것이다.

어떻게 이런 상황이 발생할 수 있는지 알아보기 위해서는 자바스크립트의 라이프 사이클 일부를 살펴봐야 한다.

## 호이스팅은 왜 생겨날까?

자바스크립트의 변수 라이프사이클을 살펴보면 알 수 있다.

![Untitled](TIL%2020211103%20Hoisting%202fcb448d1ee848538edb869b2db1696b/Untitled.png)

위에서 아래의 흐름으로 진행된다.

자바스크립트에서 변수의 라이프사이클은 크게 선언, 초기화, 할당의 단계를 거친다.

이 중 선언 단계에서 코드에 선언된 모든 변수, 함수, 클래스 선언은 변수처럼 선언 처리가 된다.
이후 실행 단계에서 할당 코드를 만났을때 선언 되었던 변수나 함수, 클래스에 값이 들어간다.

단, `var` 키워드로 선언된 변수는 선언과 동시에 초기화도 진행되기 때문에 호이스팅이 되는것이다.
그렇기 때문에 우리가 변수의 값을 미리 조회 했을 때  `undefined`를 볼 수 있는것이다.

## 그럼 `const`, `let`은 왜 호이스팅의 대상이 아닌가?

사실 자바스크립트에서는 선언하는 거의 대부분의 변수, 함수, 클래스 선언이 호이스팅의 대상이 된다.

일부 개발자들이 `var` 만 호이스팅의 대상이라고 말하는것은 TDZ라는 개념이 존재하기 때문에 사실처럼 보이는것 뿐이다.
TDZ에 대해서는 조금 뒤에 자세히 알아보자.

## 선언 전에 사용하면 참조 에러가 나던데?

앞서 말했듯 `const`, `let`으로 선언한 변수나 함수, 클래스도 호이스팅된다.

그러나 함수와 달리 클래스는 `const` 처럼 평가되기 전까지는 초기화되지 않고 TDZ에 속하므로 사용할 수 없다.

```jsx
const Tim = new Person(200, 100); // ReferenceError: Person is not defined
Tim.weight = 90;
console.log(Tim);

class Person {
  constructor(height, weight) {
    this.height = height;
    this.weight = weight;
  }
}
```

그렇기 때문에 위의 코드에서 Person을 참조해도 `undefined`를 참조하지 않고 참조 에러가 발생 하는것이다.
이 특징은 클래스 선언, 클래스 표현식 모두 해당된다.

TDZ의 존재 덕분에 위 코드를 제대로 동작하게 하려면 당연히 아래처럼 작성하게 된다.

```jsx
class Person {
  constructor(height, weight) {
    this.height = height;
    this.weight = weight;
  }
}

const Tim = new Person(200, 100);
Tim.weight = 90;
console.log(Tim);

// Print: Person {height: 200, weight: 90}
```

## [TDZ](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let#%EC%8B%9C%EA%B0%84%EC%83%81_%EC%82%AC%EA%B0%81%EC%A7%80%EB%8C%80)가 도대체 뭐길래?

TDZ(Temporal Dead Zone)는 선언문을 만나 초기화가 완료되기 전까지 변수를 참조하면 참조 에러를 발생시키는 역할을 한다.

모든 선언은 TDZ에 속할 수 있지만, `var`로 선언된 변수는 선언과 동시에 무조건 `undefined` 값으로 초기화 하기 때문에 TDZ에 속하지 않는것처럼 동작한다.

이 개념을 이해한다면 그동안 `let`, `const`, `class` 선언은 왜 호이스팅이 일어나지 않는지 이해할 수 있다.

때문에 TDZ와 블록 스코프를 알고 있다면 아래의 예시에서 에러가 발생하는게 당연하다고 여길수 있게 된다.

## 직접 눈으로 확인해보자

아래의 예시와 함께 VSC의 디버거로 손쉽게 확인해 볼 수 있다.

### var로 선언한 경우

```jsx
debugger; // 모든 코드를 읽어 초기화 된 상태

myFn(); // Output: "TypeError: myFn is not a function"

var myFn = function () {
  console.log("Will this work?");
};
```

![Untitled](TIL%2020211103%20Hoisting%202fcb448d1ee848538edb869b2db1696b/Untitled%201.png)

var로 선언한 myFn은 호이스팅이 일어나 초기화가 끝난 상태에서 undefined로 초기화 된것을 볼 수 있다.

그 증거로 `myFn()` 를 평가하면 발생하는 에러 메세지가 아래와 같다.
`Uncaught TypeError: myFn is not a function`

### const로 선언한 경우

```jsx
debugger; // 모든 코드를 읽어 초기화 된 상태

myFn(); // Output: "Uncaught ReferenceError: Cannot access 'myFn' before initialization"

const myFn = function () {
  console.log("Will this work?");
};
```

![Untitled](TIL%2020211103%20Hoisting%202fcb448d1ee848538edb869b2db1696b/Untitled%202.png)

const로 선언할 때도 마찬가지로 `myFn` 변수도 호이스팅이 일어나 변수가 미리 선언된 것을 볼 수 있다.

실제로 선언되는 모든 변수는 `undefined` 가 기본 값이기 때문에 `undefined` 로 보이기는 하지만 초기화가 끝난 상태가 아닌 TDZ에 속한 상태이므로 아직 사용할 수 없다.

그 증거로 `myFn()` 를 평가하게 되면 아래와 같은 에러가 발생한다.
`Uncaught ReferenceError: Cannot access 'myFn' before initialization`

TDZ에 속해 있을 때 접근하면 발생하는 에러다.

## 코드 검증

실제로 Node.js가 의존하고 있는 V8 엔진의 코드를 보면 아래와 같이 메세지를 별도로 관리하며, 변수 키워드에 따라 초기화 상태가 다르게 관리된다.

```jsx
// 출처: https://github.com/nodejs/node/blob/842fd234b7634200ed55141fc77d4e96c3c593bd/deps/v8/src/common/message-template.h#L325
/* ReferenceError */                                                         \
  T(NotDefined, "% is not defined")                                            \
  T(SuperAlreadyCalled, "Super constructor may only be called once")           \
  T(AccessedUninitializedVariable, "Cannot access '%' before initialization")  \
```

```jsx
// 출처: https://github.com/nodejs/node/blob/e83c8aef4b787b531f23ad7abb498fe81db5ee83/deps/v8/src/ast/variables.h#L240-L244
static InitializationFlag DefaultInitializationFlag(VariableMode mode) {
    DCHECK(IsDeclaredVariableMode(mode));
    return mode == VariableMode::kVar ? kCreatedInitialized
                                      : kNeedsInitialization;
```

```jsx
// 출처: https://github.com/nodejs/node/blob/e83c8aef4b787b531f23ad7abb498fe81db5ee83/deps/v8/src/ast/variables.h#L42-L44
// Var declared variables never need initialization.
    DCHECK(!(mode == VariableMode::kVar &&
             initialization_flag == kNeedsInitialization));
```

## 마무리

- var를 사용하면 안되는 이유에 대해 논리적으로 이해할 수 있다.
- TDZ 덕분에 우리는 호이스팅이 일어나지 않는 패턴으로 작성할 수 있게 된다.