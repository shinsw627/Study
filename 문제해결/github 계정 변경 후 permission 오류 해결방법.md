### 동일 컴퓨터에서 github 계정 변경 후 push를 할 경우 아래와 같은 에러가 발생할 수 있다.

윈도우 컴퓨터 기준 설명입니다.

![](https://velog.velcdn.com/images/shinsw627/post/119e1d9d-fee8-4c00-aed6-a41ef17fc9c4/image.png)

#### 현재 계정 정보를 확인한다.

// 유저네임 확인
git config user.name

// 유저 이메일 확인
git config user.email

나온 계정이 맞지 않다면 바꾸어준다.

// 유저 네임 변경
git config --global user.name 신규계정이름

// 유저 이메일 변경
git config --global user.email 신규 이메일

자격 증명 관리자를 검색하여 열어 준다.
![](https://velog.velcdn.com/images/shinsw627/post/043321ce-f73d-4328-b2e4-3dc5a010f198/image.png)

두번째 탭의 Windows 자격 증명을 누르고
![](https://velog.velcdn.com/images/shinsw627/post/cae186df-aaad-45ef-81a4-3549c8f69514/image.png)

깃허브에 관련된 모든 자격 증명을 제거해 준다.
![](https://velog.velcdn.com/images/shinsw627/post/80b171ea-20b0-4e0d-87dd-6ae4b41cc23e/image.png)

그 후에 다시 git push를 하면 github 로그인 창이 뜰 것이다.
여기서 인증을 다시 해주면 정상적으로 push가 완료된다!
