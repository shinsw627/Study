Nest.js에서의 Guards에 대해 소개하겠다.

## Guards
Guards는 @Injectable() 데코레이터 주석이 달려 있어야한다. Guards는 CanActiveate 인터페이스를 implement 해야만 한다.

![](https://images.velog.io/images/shinsw627/post/6703b7bd-6c6b-4bff-9850-f7336ea890e5/image.png)

Guards는 single responsibility를 가진다. 특정 상황들에 따라 주어진 조건으로 request가 route handler에 의해 handle 될 지 말지를 정한다. 이는 보통 authorization과 연관이 깊다.

Authorization은 Express에서는 주로 미들웨어로 handle 되었지만 Nest.js 에서는 Guards 를 사용할 수 있다.
하지만 미들웨어는 next() function이 call 된 후에 어떤 handler가 실행될지를 전혀 모른다 반면에 Guards는 ExecutionContest 인스턴스에 액세스할 수 있으므로 다음에 실행될 항목을 정확히 알고 있다. Exception filters나 pipes와 interceptors 와 마찬가지로 요청과 응답 싸이클에서 정확한 지점에 처리 로직을 실행할 수 있도록 설계하되어있다.
이것은 코드를 dry하고 declarative 하게 유지할 수 있게 해준다.