# 제목 없음

HTTP/HTTPS 프로토콜이 아닌 gRPC 프로토콜로 통신하는 서버 프로그램은 API 서버라고 부를 수 있을까요? (배포된 환경, 구현된 기능은 동일)

- Answer
    - 가능하다. HTTP/HTTPS가 브라우저에서도 지원하고 범용적이기 때문에 지원하는 API 서버가 일반적일 뿐, 서버와 서버 간으로 gRPC 프로토콜을 이용해 API를 호출하여 제 기능을 다 할 수 있다.

Sequlize같은 ORM과 MySQL같은 데이터베이스의 차이가 무엇인가요?

- Answer
    - ORM은 데이터베이스가 지원하는 데이터 구조를 통해 추상화 레벨을 높이는 역할
    - 데이터베이스는 특정 목적성을 가진채 데이터를 더 빠르고 정확하게 관리하도록 돕는 역할
        - 때문에 경우에 따라서 AWS S3와 같은 Object Storage도 데이터베이스의 용도로서 사용 가능하다. (Use case에 따라 적합하지 않을 수 있음)

express.js의 라우터는 미들웨어입니다. 어떤 원리로 동작하기 때문에 미들웨어로 라우터를 구현할 수 있나요?

- Answer
    - 미들웨어의 원리를 제대로 이해하고 있다면 당연. 기본적으로 라우터를 사용하지 않고, express의 내부 라우터를 사용하지 않는 경우 아래와 같이 구현하는것과 크게 다르지 않음.
    
    ```jsx
    app.use((req, res) => {
    	if (req.method !== 'GET' || req.path !== '/users/me') {
    		res.status(404).end();
    	}
    
    	// logic...
    	const result = getUserByToken(token);
    
    	res.send(result).end();
    });
    ```
    

Node.js에서 리팩토링시 사용하며, npm을 통해 다운로드 했던 모듈을 불러오는 require 함수는 어떻게 동작하나요? IIFE와 연결지어 찾아보고 정리해보세요.

- Answer
    - [https://m.blog.naver.com/jdub7138/221022257248](https://m.blog.naver.com/jdub7138/221022257248)
    - 모듈은 IIFE를 통해 encapsulation되어 호출됩니다.
    (예전에는 IIFE를 통해 캡슐화를 지원 했지만 지금은 내부 모듈 시스템에 의해 알아서 캡슐화가 됩니다.)

불필요한 테스트코드는 무엇이며, 100개의 테스트 케이스보다 1개의 테스트 케이스가 더 효과적일 수 있는 이유는 무엇인가요?

- Answer
    - 의도치 않게 Input or Output이 바뀌었을 때 검증할 수 없는 테스트코드는 불필요한 테스트코드
    - 이러한 테스트코드가 100개 있는것보다 Input, Output의 검증을 명확히 하는 테스트 코드 1개 있는게 테스트코드의 목적성에도 걸맞으며 훨씬 효과적인 테스트코드로 볼 수 있다.