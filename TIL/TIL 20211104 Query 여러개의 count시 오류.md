# TIL 20211104 Query 여러개의 count시 오류

```sql
SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count,count(c.board_id) as comment_count,
  CASE u.board_id 
  WHEN b.board_id THEN 'true'
  ELSE 'false'
  END AS like_state
  FROM boards AS b
  left OUTER JOIN comments AS c
  ON (b.board_id = c.board_id AND c.comment_delete_code = 0)
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  left OUTER JOIN likes AS u
  ON b.board_id = u.board_id AND u.user_id=1
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
  ORDER BY b.createdAt DESC
```

![Untitled](TIL%2020211104%20Query%20%E1%84%8B%E1%85%A7%E1%84%85%E1%85%A5%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B4%20count%E1%84%89%E1%85%B5%20%E1%84%8B%E1%85%A9%E1%84%85%E1%85%B2%20f0f22d7d1a8f4d32a543f0b9b56a3922/Untitled.png)

like_count와 comment_count

count를 두번 사용하면 group by의 영향인지 수치가 이상해지는 것을 깨달았다.

혹시나 싶어 count 가 겹치는 부분을 기준으로 select문을 두가지로 나누어 봤다.

```sql
SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count
 
  FROM boards AS b
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
```

![Untitled](TIL%2020211104%20Query%20%E1%84%8B%E1%85%A7%E1%84%85%E1%85%A5%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B4%20count%E1%84%89%E1%85%B5%20%E1%84%8B%E1%85%A9%E1%84%85%E1%85%B2%20f0f22d7d1a8f4d32a543f0b9b56a3922/Untitled%201.png)

위에서는 like_count를 조회하고

아래에서는 comment_count 를 조회했다. 

```sql
select b.board_id, count(c.board_id) as comment_count,
case u.board_id
when b.board_id then 'true'
else 'false'
end as like_state
FROM boards AS b
LEFT OUTER JOIN comments AS c
ON (b.board_id = c.board_id AND c.comment_delete_code=0)
left outer join likes as u
on b.board_id = u.board_id and u.user_id = 1
WHERE b.board_delete_code = 0
group by b.board_id
```

![Untitled](TIL%2020211104%20Query%20%E1%84%8B%E1%85%A7%E1%84%85%E1%85%A5%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B4%20count%E1%84%89%E1%85%B5%20%E1%84%8B%E1%85%A9%E1%84%85%E1%85%B2%20f0f22d7d1a8f4d32a543f0b9b56a3922/Untitled%202.png)

그 후에 두 테이블을 board_id를 기준으로 조인해서 하나로 만들었다.

```sql
select t1.board_id, t1.board_title, t1.board_image, t1.view_count, t1.like_count, t2.comment_count, t2.like_state from
(SELECT b.board_id,b.board_title,b.board_image,b.view_count,count(l.board_id) as like_count
 
  FROM boards AS b
  left OUTER JOIN likes AS l
  ON b.board_id = l.board_id
  WHERE b.board_delete_code = 0
  GROUP BY b.board_id
  ORDER BY b.createdAt DESC) as t1
  join
  
(select b.board_id, count(c.board_id) as comment_count,
case u.board_id
when b.board_id then 'true'
else 'false'
end as like_state
FROM boards AS b
LEFT OUTER JOIN comments AS c
ON (b.board_id = c.board_id AND c.comment_delete_code=0)
left outer join likes as u
on b.board_id = u.board_id and u.user_id = 1
group by b.board_id
ORDER BY b.createdAt DESC) as t2
on t1.board_id = t2.board_id
```

![Untitled](TIL%2020211104%20Query%20%E1%84%8B%E1%85%A7%E1%84%85%E1%85%A5%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B4%20count%E1%84%89%E1%85%B5%20%E1%84%8B%E1%85%A9%E1%84%85%E1%85%B2%20f0f22d7d1a8f4d32a543f0b9b56a3922/Untitled%203.png)

코드가 엄청 길어져 버렸는데 과연 이방법이 맞는지 의문이다...