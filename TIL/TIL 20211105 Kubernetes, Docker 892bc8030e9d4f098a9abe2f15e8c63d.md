# TIL 20211105 Kubernetes, Docker

우선 컨테이너 애플리케이션이 어떻게 이루어져 있는지 알기 위해 app이 다음과 같은 cloud native 구조로 되어있다고 생각해보자.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbvsHiB%2FbtqFUTmeNek%2FAX3NeJdlLYmIiyhERtIfU0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbvsHiB%2FbtqFUTmeNek%2FAX3NeJdlLYmIiyhERtIfU0%2Fimg.png)

FE(Front-End)는 **React**, BE(Back-End)는 **Node.js**, DB는 **Java**, 그리고 API등 app을 만들기 위해 사용하는 **python**으로 구성될 때, 우리는 하나 하나를 설치하여 하나로 묶어주어야 완전한 app이 완성된다. 즉 요소들로 하나의 컨테이너를 만들어서 배포를 한다 뜻이다.

### 컨테이너란 무엇인가?

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbS997h%2FbtqFRA2vEvW%2F6XLyXIqo6q87i6NMKgUn7K%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbS997h%2FbtqFRA2vEvW%2F6XLyXIqo6q87i6NMKgUn7K%2Fimg.png)

위 그림처럼 하나의 큰 상자로, 이것 저것 담아서 한번에 먼 거리까지 운송할 수 있게 해주는 역할이지 않는가!

여기서 언급하는 컨테이너도 마찬가지로 앞서 언급한 React, Node.js, Java, python 등을 하나로 묶어 배포할 수 있게 해주는 상자라고 생각하자📦.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJlXPP%2FbtqFRA9hTRl%2F5zV0AvlWNy3E5Vq9q0Z0rk%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJlXPP%2FbtqFRA9hTRl%2F5zV0AvlWNy3E5Vq9q0Z0rk%2Fimg.png)

### **Docker**

도커는 리눅스의 응용 프로그램들을 소프트웨어 컨테이너 안에 배치시키는 일을 자동화하는 오픈 소스 프로젝트이다. 즉, 다양한 프로그램, 실행환경 등을 컨테이너로 추상화하고 동일한 인터페이스를 제공하여 프로그램의 배포와 관치를 단순하게 해준다.

도커에서는 **컨테이너**와 **이미지**라는 개념이 중요하다. 이미지는 컨테이너 실행에 필요한 파일들과 설정을 가지고 있는 개념으로, 변하지 않는다는 특징이 있다. 컨테이너는 이미지를 실행한 상태라고 볼 수 있으며, 추가되거나 변하는 값은 컨테이너에 저장된다. 이와 같이 도커 이미지는 간단한 명령어를 통해 손쉽게 컨테이너 어플리케이션을 구축할 수 있게 해준다.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdlsSrV%2FbtqFTSBGWRx%2FJWkIPpT1umCYckNd564qr0%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdlsSrV%2FbtqFTSBGWRx%2FJWkIPpT1umCYckNd564qr0%2Fimg.png)

위의 그림과 같이 도커는 컨테이너를 spin up하는 역할로써 컨테이너화된 어플리케이션을 다룰 수 있는 여러가지 tool을 제공한다.

Ex) build, push, run ...

이 때, 우리의 어플리케이션의 load가 많아진다고 생각해보자. 부하가 많이 생기면 scale out이 많이 필요할 것이다.

- 🙋‍♂scale out이 뭐에요?
    
    수평 스케일로도 불리는 scale out은 서버의 수를 늘려 능력을 향상시키는 것을 의미한다. 다수의 처리를 병행적으로 실시해야 하는 경우에 적합한데, 갱신 데이터의 적합성(데이터가 서로 모순 없이 일관되게 일치해야 하는 경우) 유지에 대한 요건이 어렵지 않은 경우에 적절하다.
    

따라서 위의 구조를 여러번 배포하여 여러 개의 서버에서 동작하도록 하고 싶다면 어떻게 해야 할까?

**Ops engineer**(운영 & 배포 팀)는 stack에 대한 script를 가지고 있으므로 새로운 하드웨어를 가지고 똑같은 배포를 여러번 하자고 말할 것이다. 하지만 여기서 **Dev team**(개발 팀)은 새로운 microservice를 만들면 어디에 넣어야 할지 의문이 생길 것이다. 그저 새로운 하드웨어로 배포를 여러번 하는 것은 여러 서버의 관리를 수동으로 제어해야 하는 불편함이 발생한다.

여기서 microservice 기반 app은 각각의 요소에 대해 scale out할 수 있는 장점을 통해 **orchestration tool**인 쿠버네티스가 등장하게 된다.

### **Kubernetes**

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbD8adq%2FbtqFUAHgUnV%2F9kmnrZXDrb7RKJGA7JvXuK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbD8adq%2FbtqFUAHgUnV%2F9kmnrZXDrb7RKJGA7JvXuK%2Fimg.png)

쿠버네티스는 컨테이너화된 워크로드와 서비스를 관리하기 위한 이식할 수 있고, 확장 가능한 오픈소스 플랫폼으로, 선언적 구성과 자동화를 모두 지원한다. 또한 쿠버네티스의 오케스트레이션 시스템을 사용하면 상용 서비스에 사용할 서버들을 클러스터로 구성하기만 하면 명령어 한번으로 자동 배포가 가능하다. 그리고 클러스터 일부에 문제 혹은 장애가 발생하면 시스템이 문제가 발생한 서버에 있는 컨테이너를 정상 운영 중인 다른 서버로 옮겨서 실행하는 등 여러 대의 서버에 배포한 컨테이너를 수월하게 관리할 수 있도록 해준다.

쿠버네티스란 명칭은 키잡이(helmsman)나 파일럿을 뜻하는 그리스어에서 유래했다. 구글이 2014년에 쿠버네티스 프로젝트를 오픈소스화했다. **Kubernetes**라고도 부르고 **k8s**라고도 부른다.

[https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBzal4%2FbtqFUAUPrV6%2F5skJa4odCBHGFuOckWCdgk%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBzal4%2FbtqFUAUPrV6%2F5skJa4odCBHGFuOckWCdgk%2Fimg.png)

위의 그림은 쿠버네티스를 통해 orchestration을 수행한 구조도로, 각각의 상자는 server stack을 나타낸다. 쿠버네티스에는 master node와 worker node로 구성된다. master node는 모든 worker node와 연결되어 app을 host할 위치, 합치는 방법, 그리고 start, stop, update 등 orchestration을 관리한다.

쿠버네티스는 배포(Deployment), 개발(Development), 모니터링(Monitoring)에서의 강점을 가지고 있으며 특징은 다음과 같다.

- 선언적 API : 쿠버네티스의 상태만 설정하면 지속해서 컨테이너의 상태를 확인하여 설정한 상태에 맞춘다.
- 워크로드 분리 : 쿠버네티스는 분산된 프로세스의 관리를 추상화하는 레이어가 있어 시스템 운영 고민을 덜어준다.
- 어디서나 실행 가능 : Local, On-Premise, Cloud 어디서나 손 쉽게 사용이 가능하다.

### **Conclusion**

쿠버네티스와 도커중 하나를 선택해서 사용하는게 아니다. 도커는 microservice를 컨테이너화 하는 플랫폼이고, 쿠버네티스는 컨테이너화 한 어플리케이션을 여러 서버에 배포할 때 관리를 수월하게 할 수 있게 함으로써 도커 워크로드를 다룰 수 있게 해주는 시스템이다.