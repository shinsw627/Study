// ; 등수구하기
// ; N(1<=N<=100)명의 학생의 국어점수가 입력되면 각 학생의 등수를 입력된 순서대로 출력하는
// ; 프로그램을 작성하세요.
// ; ▣ 입력설명
// ; 첫 줄에 N(3<=N<=1000)이 입력되고, 두 번째 줄에 국어점수를 의미하는 N개의 정수가 입력
// ; 된다. 같은 점수가 입력될 경우 높은 등수로 동일 처리한다. 즉 가장 높은 점수가 92점인데
// ; 92점이 3명 존재하면 1등이 3명이고 그 다음 학생은 4등이 된다.
// ; ▣ 출력설명
// ; 입력된 순서대로 등수를 출력한다.
// ; ▣ 입력예제 1
// ; 5
// ; 87 89 92 100 76
// ; ▣ 출력예제 1
// ; 4 3 2 1 5

// 이중 포문으로 풀었다.
// ### Array.from()

// `Array.from(*arrayLike*[, *mapFn*[, *thisArg*]])`

// ### [매개변수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from#parameters)

// **`arrayLike`**배열로 변환하고자 하는유사 배열 객체나 반복 가능한 객체.**`mapFn`Optional**배열의 모든 요소에 대해 호출할 맵핑 함수.**`thisArg`Optional**`mapFn` 실행 시에 `this`로 사용할 값.

// ### [반환 값](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from#%EB%B0%98%ED%99%98_%EA%B0%92)

// 새로운 `[Array](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)` 인스턴스.

// ## [설명](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from#description)

// 다음과 같은 경우에 `Array.from()`으로새`Array`를 만들 수 있습니다.

// - 유사 배열 객체 (`length` 속성과 인덱싱 된 요소를 가진 객체)
// - [순회 가능한 객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) (`Map`, `[Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)` 등객체의 요소를 얻을 수 있는 객체)

// `Array.from()`은 선택 매개변수인 `mapFn`를 가지는데, 배열(혹은 배열 서브클래스)의 각 요소를[맵핑](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)할 때 사용할 수 있습니다. 즉,`Array.from(obj, mapFn, thisArg)`는 중간에 다른 배열을 생성하지 않는다는 점을 제외하면`Array.from(obj).map(mapFn, thisArg)`와 같습니다. 이 특징은 [typed arrays](https://developer.mozilla.org/ko/docs/Web/JavaScript/Typed_arrays)와 같은 특정 배열 서브클래스에서 중간 배열 값이 적절한 유형에 맞게 생략되기 때문에 특히 중요합니다.

// `from()` 메서드의 `length` 속성은 1입니다.

// ES2015 이후, 클래스 구문은 내장 및 새 클래스의 상속을 가능케 했습니다. 그 결과로 `Array.from`과 같은 정적 메서드는 `Array`의 서브클래스에 의해 상속되며, `Array` 대신 자신의 인스턴스를 만듭니다.

function solution(arr) {
  let n = arr.length;
  let answer = Array.from({ length: n }, () => 1);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[j] > arr[i]) answer[i]++;
    }
  }
  return answer;
}

let arr = [87, 89, 92, 100, 76];
console.log(solution(arr));
