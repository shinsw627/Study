# TIL 20211101 API 설계원칙

## API 설계 원칙

- 도입 이유
  우리는 결론적으로 **웹 어플리케이션 서버를 개발하고 운영**하는 것이 목적이므로, **'이렇게 HTTP 요청을 보내면, 이렇게 응답해준다'**라는 **스펙을 기능에 따라 설계**해야 한다. API 설계 원칙은 **웹 서버의 API 스펙을 어떤 규칙에 따라 정의할 것인지**를 나타낸다.
  - '`GET /post`는 게시글 목록을 불러오고, `GET /post/{id}`는 특정 게시글의 내용을 불러온다'같은 설계는 다 **아키텍처 기반으로 결정**하는 것이 좋다. 아키텍처가 없다고 API 디자인을 못하는 것은 아니지만, **의사결정의 기반이 있는 것이 좋기 때문**이다.
  - '잘 디자인된' API는 **불필요한 커뮤니케이션 비용**을 줄인다.
- 직렬화 포맷
  직렬화 포맷에 대해 예를 들면, '게시글'을 나타내는 '제목'과 '내용' 데이터를 표현하기 위해 아래와 같은 방법들을 사용할 수 있다.
  ```
  {
      "title": "...",
      "content": "..."
  }
  ```
  ```
  syntax = "proto3";

  message Post {
    required string title = 1;
    required string content = 2;
  }
  ```
  ```
  <title>...</title><content>...</content>
  ```
  ```
  title: ...
  content: ...
  ```
  **데이터를 어떤 방식으로 표현할 지**를 결정해 두어야, 클라이언트와 서버 간의 **데이터 교환에서 혼란을 줄일 수 있다.**
- 배경과 요구사항
  - **클라이언트 사이드에게 익숙한 아키텍처**거나, **러닝커브가 감당 가능한 수준**이어야 한다.
  - 개발 일정에 딜레이를 일으킬 여지가 있으면 안된다.
- **HTTP API**를 선택 ?정리 필요
  - **REST API가 명시하는 모든 원칙을 만족하는 API를 작성하는 것은 쉽지 않다.** 결국은 **'느슨한 REST'** 느낌의 **HTTP API**가 되기 마련이다. 따라서 괜히 RESTful API 이러면서 깝치다가 정의구현 당하는 수가 있다. 제약조건을 따르던지 다른 단어를 쓰도록 하자. REST의 `self-descriptive`와 `HATEOAS` 원칙은 만족하기 정말 어렵다.
  - REST는 `HATEOAS(hypermedia as the engine of application state)`라는 원칙을 지켜야 하는데, 이는 **'어플리케이션의 상태가 Hyperlink를 이용해 전이되어야 한다'**라는 의미다. 우리의 API는 **미디어 타입이 JSON**(JSON 형식의 데이터를 위주로 주고받는 형태)일텐데, HATEOAS를 지키기 어렵다.
  - API가 **꼭 REST API여야 할 필요가 없다.**
  - GraphQL은 **사례가 너무 적다.** 사용자 인증 처리 로직을 생각하는 것부터 고민이 많아진다.
  - GraphQL은 **클라이언트 사이드에서 러닝커브**가 생길 수 있다.
  - HTTP API가 이야기하는 아키텍처로 충분할 것이라고 판단했다.
- json을 선택
  - 동일한 데이터를 표현하더라도, JSON이 **비교적 더 잘 경량화**되어 있으며 **가독성**도 좋다.
  - `XML`의 tree 구조는 **자원을 표현하는 데에 그리 효과적인 포맷은 아닌 것 같다**고 판단했다.(Array의 표현이 어려움) 옛날엔 많이 쓰였다고 하는데, 주관적인 의견을 덧대자면 진짜 이거 왜 쓰는지 모르겠다. 아직도 공공 API의 일부가 XML을 쓰는 게 정말 놀랍다.
  - `YAML`은 **관례 상 직렬화 포맷으로 잘 사용하지 않는다.** 역직렬화 속도도 느리고, YAML을 썼을 때 생기는 메리트가 딱히 없다.
  - `Protobuf`는 **구글에서 개발한 data exchange format**이다. 직렬화/역직렬화 속도가 빨라 **성능 상의 이점**이 있고, **.proto 파일을 정의**하는 것만으로 **validation rule들을 정리**하고, 비교적 **적은 노력으로 API 문서화에도 응용**할 수 있으며, 클라이언트 단은 **proto 컴파일을 통해 이들에 대응되는 클래스(DTO)들을 자동으로 정의**할 수도 있어서 시도해볼 가치가 충분하다. 그러나 조직 내에 **protobuf를 사용했을 때 문제가 없을지에 대한 신뢰 수준**이 낮고, 우리의 서비스 규모가 크지 않으므로 **protobuf에 대한 확신이 생기고 난 후에 바꾸더라도 스트레스가 크지 않을 것**이라는 생각이다. 당장은 다들 익숙해 하는 JSON을 쓰고, 나중에 바꿔 보자.
  - `JSON`은 **JavaScript Object Notation**의 약자다. JavaScript나 그 형제들(TypeScript 등)로 로직 처리를 하게 될 프론트엔드에게 **JSON만큼 편한 구조**가 없으며, 모바일 앱과 웹을 포함해 **대부분의 프론트엔드 엔지니어들은 이미 JSON에 익숙해져 있다.**

## Express res.json 과 res.send 비교

- res.json 함수와 res.send함수
  `res.send(object)`를 실행하면 함수의 호출 순서는 다음과 같다.
  1. **res.send(object)**
  2. **res.json(object)**
  3. **res.send(string)**
  그리고 `res.json(object)`를 실행했을 때 함수의 호출 순서는 다음과 같다.
  1. **res.json(object)**
  2. **res.send(string)**
  `object`를 인자로 `res.send`를 호출하면 `res.json`을 호출했을 때 보다 **불필요한 호출**이 한 번 더 발생한다.
  불필요한 함수 호출이 한번 더 발생하는 것은 어쨌든 추가 비용은 발생하는 것이기 때문에, JSON 응답을 한다면 `res.send`보다 `res.json`이 적절한 것 같다.
  또한 소스코드를 읽을 때에도 `res.json`이 JSON 데이터를 보낸다는 의도가 더 명확하게 드러난다. 예를 들어서 `res.send({data:1})`라면 객체를 즉시 생성해서 전달하기 때문에 JSON을 응답하는 것을 유추할 수 있지만, `res.send(data)`처럼 객체의 참조값을 변수에 담아서 인자로 넘긴다면 JSON 응답을 하는지 쉽게 구분이 가지 않을 것이다.
