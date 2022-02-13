# The bucket does not allow ACLs

S3 bucket 스토리지에 이미지를 업로드 하는 것을 구현하던 중에
The bucket does not allow ACLs 라는 오류가 발생하였다.
![](https://images.velog.io/images/shinsw627/post/8c3dabb7-a66d-4c4f-9d71-e43898e78d79/image.png)

ACL이란

Access List => 접근하는 것을 허용 또는 거부하는 접근제어 리스트 ACL을 통해 필터링 이라는 기능을 수행할 수 있는데 특정 주소를 가진 호스트의 접근을 막거나 특정 서비스를 차단하는 등의 여러 목적으로 사용될 수 있다.

쉽게 설명해서 파티 초대장 리스트 같은 것이라 생각할 수 있다.

예를 들어 파티를 할때 초대장을 지인들에게 나누어 주는데 초대장을 받은 사람은 파티에 들어올 수 있고, 받지 못한 사람은 들어올 수 없도록 하는 것이다. 초대 받은사람인지 아닌지를 확인하기 위해 만들어진 초청자 목록이 있는데 이 목록이 바로 ACL이라고 할 수 있다.
출처 : https://net-gate.tistory.com/18

![](https://images.velog.io/images/shinsw627/post/e9a1b4e5-3d33-4ed5-9ad3-5ea4a1f87103/image.png)
S3의 권한 탭에서 밑으로 스크롤 하여
![](https://images.velog.io/images/shinsw627/post/d9af43d3-3c4f-4a08-862c-db76a9b07436/image.png)
객체 소유권을 찾은 후에 편집에 들어가
![](https://images.velog.io/images/shinsw627/post/637d9c54-1b35-41b4-a03a-18a4aa905984/image.png)
ACL 활성화됨을 체크 후에 밑에 !부분의 ACL이 복원된다는 것을 확인합니다. 까지 체크 한 후에 변경 사항 저장을 눌러주면 해결된다.

![](https://images.velog.io/images/shinsw627/post/be6b03dd-f7f4-4eb3-bcf3-5e8d40843702/image.png)
콘솔로그에 이미지 업로드가 잘 되는 것을 확인하였고

![](https://images.velog.io/images/shinsw627/post/274cc0ec-9365-4956-bba5-ef90306c7a26/image.png)
이미지 또한 확인하였다.
