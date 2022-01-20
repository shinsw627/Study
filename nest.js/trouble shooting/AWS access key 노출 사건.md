네이버에서 공포스런 한 메일을 받게된다.
![](https://images.velog.io/images/shinsw627/post/1d57d6fa-b044-4b91-b9ae-295c8992a3d3/image.png)
평소에 메일을 잘 확인 안해서 몰랐는데 AWS 액세스 키가 노출되었다는 내용이었다.
정말 깜작놀라 급하게 확인해보니
![](https://images.velog.io/images/shinsw627/post/2cf4aa2c-4262-4696-8433-366a6cd3e83a/image.png)
그렇다. 지금까지 .env를 그대로 올리고 있었던 것이었다.

gitignore에 .env가 당연히 설정되어있을 줄 알았으나 당연한 것은 당연하게도 없었다...

즉시 AWS 보안 자격 증명에 들어가 쓰던 access key를 비활성화 하고 새롭게 발급받았다.
![](https://images.velog.io/images/shinsw627/post/74c2b0a6-3a22-4aa4-b781-409b2ffbe2d1/image.png)

버킷사진
![](https://images.velog.io/images/shinsw627/post/4124d7a1-136c-42f4-9988-c27cbbb564ab/image.png)
다행히 악의적으로 사용된 흔적은 발견되지 않아 요금청구는 없을 것 같다.

그리고 몽고디비아틀라스 URI도 그대로 노출되어 있어서 user 비밀번호를 변경하고 디비도 완전 새로 만들었다.
![](https://images.velog.io/images/shinsw627/post/f99c0cf4-fda9-4b9f-9c22-2860b47b12e0/image.png)
회원가입 실험

![](https://images.velog.io/images/shinsw627/post/8b2cc90f-3d91-4fd2-a2e8-50a15b49d4b9/image.png)
DB저장에 되는 것을 확인하였다

![](https://images.velog.io/images/shinsw627/post/df0baf28-ee30-46e7-b9de-b2cac305fc13/image.png)
postman으로 실험결과
![](https://images.velog.io/images/shinsw627/post/828d3854-2722-4453-8422-e8ad8225b239/image.png)
S3에도 정상적으로 저장이 되는 것을 확인하였다.

다행히 문제없이 잘 작동하였다.

정말 간담이 서늘했다.
나의 흑역사로 간직될 것이다... ㅜㅠ
