### Repository 패턴이란

데이터 출처(로컬 DB, 서버 API 응답 등)와 관계 없이 동일 인터페이스로 데이터에 접속할 수 있도록 레포지토리를 만들어 관리하는 것을 말한다.
데이터를 사용하는 Domain에서는 비즈니스 로직에만 집중할 수 있으며 ViewModel은 데이터 출처를 신경 쓸 필요가 없고 여러 Repository를 공유하더라도 일관된 Interface를 통해 데이터의 일관성 또한 유지할 수 있다.
![](https://images.velog.io/images/shinsw627/post/e2be75e4-cc8f-48ae-91d5-5ab490010556/image.png)

장점
(1) 데이터 로직과 비즈니스 로직을 분리할 수 있다

(2) Domain에서는 일관된 인터페이스를 통해 데이터를 요청할 수 있다.

(3) 데이터 저장소의 데이터를 캡슐화할 수 있다. 객체지향적인 프로그래밍에 더 적합하다.

(4) 단위 테스트를 통한 검증이 가능하다.

(5) 객체 간의 결합도가 감소한다.

(6) 어플리케이션의 전체적인 디자인이 바뀌더라도 적용할 수 있는 유연한 아키텍쳐이다.

![comments.service.ts](https://images.velog.io/images/shinsw627/post/7add9c6a-0b85-4f82-9c51-32f727d82031/image.png)

![comments.service.ts](https://images.velog.io/images/shinsw627/post/6bc8b87b-59b0-421a-a1ba-86184984220c/image.png)
<comments.service.ts>
comments.service.ts에서 cats.repository.ts에게 의존성 주입받아 repository에서 데이터로직과 비즈니스 로직이 분리되어 있도록 구현하였다.

![cats.repository.ts](https://images.velog.io/images/shinsw627/post/42699359-1f76-4f3d-88a8-0af01bf3ee09/image.png)
<cats.repository.ts>
repository.ts에서 DB에 접속하는 데이터로직이 처리된다.
