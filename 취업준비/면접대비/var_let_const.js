// // var name = "1111";
// // console.log(name); // 1111

// // var name = "2222";
// // console.log(name); // 2222

// // let name = "1111";
// // console.log(name); // 1111

// // let name = "2222";
// // console.log(name);
// // // SyntaxError: Identifier 'name' has already been declared

// let name = "1111";
// console.log(name);
// // 1111

// name = "2222";
// console.log(name);
// // 2222

function varTest() {
  var x = 1;
  if (true) {
    var x = 2; // 같은 변수!
    console.log(x); // 2
  }
  console.log(x); // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2; // 다른 변수
    console.log(x); // 2
  }
  console.log(x); // 1
}

function do_something() {
  console.log(bar); // undefined
  console.log(foo); // ReferenceError
  var bar = 1;
  let foo = 2;
}

// 스코프의 선두에서 선언 단계와 초기화 단계가 실행된다.
// 따라서 변수 선언문 이전에 변수를 참조할 수 있다.

console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
