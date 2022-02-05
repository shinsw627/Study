ExceptionFilter 적용 전

![](https://images.velog.io/images/shinsw627/post/e5b39353-d41b-4f2a-a40e-c11748cf2663/image.png)

nest.js에서 기본으로 제공하는 에러메세지이다.

이것을 HttpExceptionFilter를 만들어 커스텀 할 수 있다.

![http-exception.filter.ts](https://images.velog.io/images/shinsw627/post/9317aa47-cfd6-4493-b979-c92f9ae9dacb/image.png)

nest.js document에서 아주 살짝만 수정했다.

![](https://images.velog.io/images/shinsw627/post/a553d67e-dbc1-4c1b-8151-22804a6bd75d/image.png)

![](https://images.velog.io/images/shinsw627/post/7e2aa743-39ae-4a0a-8217-a90bfb805b4e/image.png)

얼마든지 원하는대로 커스텀이 가능하며 이렇게 구현하면 에러메세지를 수정하는 로직이 따로 분리되어 관리하기가 쉬워진다.
