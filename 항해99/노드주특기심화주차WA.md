# Node.js 주특기 주차 W.A. 예제

---

# 각 팀당 두 가지 질문을 스스로 만들어서 답변해 보세요 :-)

## SSR & CSR

#### Single Page Application

SPA는 최초 한번 페이지 전체를 로딩한 이후 부터는 데이터만 변경하여 사용할 수 있는 웹 어플리케이션(하나의 html파일로만 동작함, 리액트 프로젝트 파일도 보면 다 html파일 하나로 작업)SPA는 클라이언트사이드렌더링 방식이다!

#### Server Side Rendering

서버에서 렌더링을 작업하는 렌더링 방식, 전통적인 웹 어플리케이션 렌더링 방식으로 사용자가 웹 페이지에 접근할 때, 서버에 각각의 페이지에 대한 요청을 하며 서버에서 html, js 파일 등을 다 다운로드해서 화면에 렌더링하는 방식

#### Client Side Rendering

클라이언트 사이드 렌더링은 SPA로, 클라이언트 사이드에서 HTML을 반환한 후에, JS가 동작하면서 데이터만을 주고 받아서 클라이언트에서 렌더링을 진행하는 것점점 더 복잡해지는 웹페이지를 구현하기 위해서 전통적인 방식의 SSR보다는 CSR로 웹을 구현하는 경우가 많아짐

### 장단점!

#### CSR의 장점

- 클라이언트 사이드 렌더링은 사용자의 행동에 따라 필요한 부분만 다시 읽어들이기때문에 SSR 보다 조금 더 빠른 인터랙션이 가능
- page 전체를 요청하지 않고 페이지에 필요한 부분만 변경하게 하기 때문에, 모바일 네트워크에서도 빠른 속도로 렌더링이 가능
- lazy loading을 지원해줌*lazy loading이란 ? 페이지 로딩 시 중요하지 않은 리소스의 로딩을 늦추는 기술(Ex. 스크롤 내려야만 해당 이미지 보이게 하는 것)*
- 서버사이드 렌더링이 따로 필요하지 않기때문에 일관성있는 코드를 작성할 수 있음

#### CSR의 단점

- Googlebot과 Searchconsole에 검색 노출이 되지 않음 (브라우저가 없기때문에, html만 가져와서 검색에는 뜨지 않음)
- 페이지를 읽고, 자바스크립트를 읽은 후 화면을 그리는 시간까지 모두 마쳐야 콘텐츠가 사용자에게 보여지기 때문에 초기구동 속도가 느림.

#### SSR의 장점

- 사용자가 처음으로 컨텐츠를 볼 수 있는 시점을 앞당길 수 있음
- 검색엔진최적화(SEO) 적용이 용이

#### SSR의 단점

- 모든 요청에 관해 필요한 부분만 수정하는 것이 아닌, 완전히 새페이지를 로딩하고 렌더해줌(새로고침)
- 전체를 로딩하다보니 CSR보다 느리고, bandwitdh를 많이 쓰고, 사용자 경험 좋지 않음(사용자가 처음으로 컨텐츠를 볼 수는 있으나, 화면단에는 html요소들이 나오나 js파일이 다 다운로드 되지않아서 버튼이 클릭되지않는 등의 현상이 있을 수 있음)

---

## SQL & NoSQL

#### **SQL (관계형 DB)**

SQL을 사용하면 RDBMS에서 데이터를 저장, 수정, 삭제 및 검색 할 수 있음
관계형 데이터베이스에는 핵심적인 두 가지 특징이 있다.

- 데이터는 **정해진 데이터 스키마에 따라 테이블에 저장**된다.
- 데이터는 **관계를 통해 여러 테이블에 분산**된다.
  데이터는 테이블에 레코드로 저장되는데, 각 테이블마다 명확하게 정의된 구조가 있다. 해당 구조는 필드의 이름과 데이터 유형으로 정의된다.
  따라서 **스키마를 준수하지 않은 레코드는 테이블에 추가할 수 없다.** 즉, 스키마를 수정하지 않는 이상은 정해진 구조에 맞는 레코드만 추가가 가능한 것이 관계형 데이터베이스의 특징 중 하나다.

#### **NoSQL (비관계형 DB)**

NoSQL에서는 레코드를 문서(documents)라고 부른다.
여기서 SQL과 핵심적인 차이가 있는데, SQL은 정해진 스키마를 따르지 않으면 데이터 추가가 불가능했다. 하지만 NoSQL에서는 다른 구조의 데이터를 같은 컬렉션에 추가가 가능하다.
문서(documents)는 Json과 비슷한 형태로 가지고 있다. 관계형 데이터베이스처럼 여러 테이블에 나누어담지 않고, 관련 데이터를 동일한 '컬렉션'에 넣는다.
따라서 위 사진에 SQL에서 진행한 Orders, Users, Products 테이블로 나눈 것을 NoSQL에서는 Orders에 한꺼번에 포함해서 저장하게 된다.
따라서 여러 테이블에 조인할 필요없이 이미 필요한 모든 것을 갖춘 문서를 작성하는 것이 NoSQL입니다.

#### **SQL 장점**

- 명확하게 정의된 스키마, 데이터 무결성 보장
- 관계는 각 데이터를 중복없이 한번만 저장

#### **SQL 단점**

- 덜 유연함. 데이터 스키마를 사전에 계획하고 알려야 함. (나중에 수정하기 힘듬)
- 관계를 맺고 있어서 조인문이 많은 복잡한 쿼리가 만들어질 수 있음
- 대체로 수직적 확장만 가능함

#### **NoSQL 장점**

- 스키마가 없어서 유연함. 언제든지 저장된 데이터를 조정하고 새로운 필드 추가 가능
- 데이터는 애플리케이션이 필요로 하는 형식으로 저장됨. 데이터 읽어오는 속도 빨라짐
- 수직 및 수평 확장이 가능해서 애플리케이션이 발생시키는 모든 읽기/쓰기 요청 처리 가능

#### **NoSQL 단점**

- 유연성으로 인해 데이터 구조 결정을 미루게 될 수 있음
- 데이터 중복을 계속 업데이트 해야 함
- 데이터가 여러 컬렉션에 중복되어 있기 때문에 수정 시 모든 컬렉션에서 수행해야 함 (SQL에서는 중복 데이터가 없으므로 한번만 수행이 가능)

---

# HTTP/HTTPS 프로토콜이 아닌 gRPC 프로토콜로 통신하는 서버 프로그램은 API 서버라고 부를 수 있을까요? (배포된 환경, 구현된 기능은 동일)

### 비교

| 기능                 | gRPC                     | HTTP API                       |
| -------------------- | ------------------------ | ------------------------------ | ------------ | --------- |
| 계약                 | 필수(.proto)             | 선택사항(OpemAPI)              | 뚝배기깹니다 |
| 프로토콜             | HTTP/2                   | HTTP                           |
| Payload              | Protobuf(소형이진)       | JSON(대형, 사람이 읽을 수 있음 |
| 규범                 | 엄격한 사양              | 느슨함, 모든 HTTP가 유효함     |
| 스트리밍             | 클라이언트, 서버, 양방향 | 클라이언트, 서버               |
| 브라우저 지원        | 아니요(gRPC-웹 필요)     | 예 보안                        | 전송(TLS)    | 전송(TLS) |
| 클라이언트 코드 생성 | 예                       | OpenAPI + 타사 도구            |

- gRPC 프로토콜도 API 서버라고 부를 수 있습니다. 배포된 환경, 구현된 기능은 동일 하지만, 위의 비교를 분석 했을 때처럼 엄격한 사양을 다 맞춘 상태라면 충분히 API로 작동이 되기 때문에 조건이 까다롭고 제약도 많고 엄격할 뿐 사용이 가능합니다.
- gRPC는 제약에 따른 약점도 많이 가지고 있습니다.
  - HTTP/2 기능을 많이 사용하며, 브라우저에서 gRPC 클라이언트를 지원하기 위해 웹 요청에 필요한 제어 수준을 제공하지 않습니다. 예를 들어, 브라우저는 호출자가 HTTP/2를 사용하도록 요구하거나 기본 HTTP/2 프레임에 대한 엑세스를 제공하지 않습니다.
  - HTTP API 요청은 텍스트로 전송되며, 사람이 읽고 만들 수 있는 방면, gRPC 메세지는 기본적으로 Protobuf로 인코딩 됩니다. 송신 및 수신에 효율적이지만, 이진 형식은 사람이 읽을 수 없습니다.

---

# Sequlize같은 ORM과 MySQL같은 데이터베이스의 차이가 무엇인가요?

ORM(Object Relational Model)은 사물을 추상화시켜 이해하려는 OOP적 사고방식과 DataModel을 정형화하여 관리하는 RDB(관계형 데이터베이스) 사이를 연결할 계층의 역할로 제시된 패러다임으로 RDM의 모델을 OOP에 Entity 형태로 투영시키는 방식을 사용한다.

- 차이
  1. 세밀함의 불일치
     - RDB 데이터 타입은 Vendor마다 다르며, 더 이상 정규화가 힘이 듭니다.
  2. 하위 타입 문제
     - RDB에는 상속의 개념이 없습니다.
  3. 동일성 문제
     - Java의 경우 Equals로 평가 가능하지만, DB는 PK 기준으로 합니다.
  4. 연관 관계
     - FK는 연관의 방향성을 갖지 못하기 때문에 N:N 모델의 경우 Link 테이블을 도입해야 합니다.
  5. 데이터 검색

     - RDB는 한번에 많이 가져올지(메모리) 빈번하게 데이터를 가져올지(성능) 고민해야 합니다.

---

# express.js의 라우터는 미들웨어입니다. 어떤 원리로 동작하기 때문에 미들웨어로 라우터를 구현할 수 있나요?

ClIENT와 SERVER 양 쪽을 연결하여 데이터를 주고 받을수 있도록 중간에서 매개 역할을 하는 소프트웨어입니다.
클라이언트에서 req 를 준다면 서버의 미들웨어들을 하나씩 넘어가면서 마지막 최종 미들웨어서 res를 통해서 클라이언트에 데이터를 전달하는 구조로 되어있습니다.

---

# Node.js에서 리팩토링시 사용하며, npm을 통해 다운로드 했던 모듈을 불러오는 require 함수는 어떻게 동작하나요? IIFE와 연결지어 찾아보고 정리해보세요.

IIFE : 즉시 실행 함수 표현식

- 과거엔 var만 사용할 수 있었습니다. 그런데 var의 스코프는 블록 레벨 수준이 아니죠. 개발자들은 var도 블록 레벨 스코프를 가질 수 있게 여러가지 방안을 고려하게 됩니다. 이때 만들어진 것이 '즉시 실행 함수 표현식(immediately-invoked function expressions)'입니다. 즉시 실행 함수 표현식은 IIFE라고 부르기도 합니다.

```
    // 함수를 선언과 동시에 실행하려고 함
    function() { // <-- Error: Function statements require a function name
    let message = "Hello";
    alert(message); // Hello
    }();
```

require은 함수이고, 함수는 객체이므로 IIFE의 즉시 실행 함수를 사용하여 require을 불러옵니다.
IIFE는 함수의 선언과 동시에 함수 호출이되는 익명함수이기에 const를 통한 선언과 require을 통해 불러올수있습니다.  
const "변수명" = require("설치모듈")처럼 require이 선언되는 동시에 IIFE가 호출됩니다.

---

# 불필요한 테스트코드는 무엇이며, 100개의 테스트 케이스보다 1개의 테스트 케이스가 더 효과적일 수 있는 이유는 무엇인가요?

- 일곱 테스트 원칙 (Seven Testing Principles)
  - 테스팅은 결함의 존재를 보여주는 것이다.
  - 완벽한 테스트는 불가능하다.
  - 테스트 구성은 가능한 빠른 시기에 시작한다.
  - 결함은 군집되어 있다.
  - 살충제 역설(Pesticide Paradox) — 비슷한 테스트가 반복되면 새로운 결함을 발견할 수 없다.
  - 테스팅은 정황에 의존적이다.
  - 오류 부재의 오해 — 사용되지 않는 시스템이나 사용자의 기대에 부응하지 않는 기능의 결함을 찾고 수정하는 것은 의미가 없다.
