# TIL 20211102 SQL Query

실전프로젝트의 마이페이지 부분을 구현 완료하였다.

그 때 사용하였던 쿼리문을 조금 정리해보았다.

```sql
SELECT b.board_id, b.board_title,b.board_content,b.view_count,b.board_image, count(l.board_id) as likeCnt,count(c.board_id) as commentCnt,
    // 각각 조회하여 만들 테이블의 칼럼을 말한다. count 함수의 경우 숫자를 세는 것이다.
		// like테이블의 board_id의 수와 comment테이블의 board_id 수로 각각 좋아요 댓글 갯수를 조회하였다.
		// as 뒷 부분은 조회될 때의 칼럼명을 의미한다.
		CASE lb.board_id
    WHEN b.board_id THEN 'true'
    ELSE 'false'
    END AS like_state
		// 케이스 문은 lb.board_id가 b.board_id 일 때, 'true'로 그 외에는 'false로 하고
		//컬럼명은 like_state로 하겠다 라는의미이다.

				//FROM 시작
        FROM database_final_project.boards AS b
        LEFT OUTER JOIN database_final_project.comments AS c
        ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
				// comments테이블을 c로 명명하고 board테이블의 board_id와 comments테이블의 board_id가 같으며,
				// comments테이블의 comment_delete_code 가 0인 조건으로 LEFT OUTER JOIN 하겠다는 의미다.
        LEFT OUTER JOIN database_final_project.likes AS l
        ON b.board_id = l.board_id
				// likes 테이블을 l로 명명하고 board 테이블의 board_id와 likes테이블의 board_id가 같은 조건으로 LEFT OUTER JOIN 하겠다는 의미다.
        LEFT OUTER JOIN database_final_project.likes AS lb
        ON (b.board_id = lb.board_id AND lb.user_id = ${userId})
				// likes 테이블을 lb로 명명하고 boards 테이블의 board_id와 likes테이블의 user_id가 내가 정한(원하는) user_id값과 동일한 조건으로 LEFT OUTER JOIN 하겠다는 의미다.
				
				//WHERE
        WHERE b.board_id = lb.board_id
				//GROUP BY
        GROUP BY b.board_id
        
        ORDER BY b.createdAt DESC

```

조인에 대해 검색하다가 간단하게 이해하기 좋은 그림이 있어 가져와봤다.

![https://postfiles.pstatic.net/MjAyMTEwMDFfNyAg/MDAxNjMzMDY2MDA4MzQ3.Pbk_lgsebUV39aOYy300OnVRv5HDr7bmvicHqFAvFT4g.RL314663vqTflBqzPAVT3fe6a23JcmQ21yQeO9v5qYQg.PNG.boy1434/Screenshot_81.png?type=w773](https://postfiles.pstatic.net/MjAyMTEwMDFfNyAg/MDAxNjMzMDY2MDA4MzQ3.Pbk_lgsebUV39aOYy300OnVRv5HDr7bmvicHqFAvFT4g.RL314663vqTflBqzPAVT3fe6a23JcmQ21yQeO9v5qYQg.PNG.boy1434/Screenshot_81.png?type=w773)

쿼리부분은 아직 숙련이 필요할 것 같다.

이해하기에 많이 어렵진 않았지만(잘 만들었다고 느꼈다.) 숙련되기엔 많은 시간이 필요할 것 같다.