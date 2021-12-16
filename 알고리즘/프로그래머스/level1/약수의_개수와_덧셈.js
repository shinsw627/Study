function solution(left, right) {
  var answer = 0;
  let pow = 1;
  let n;
  for (let i = left; i <= right; i++) {
    answer += i;
    n = Math.floor(Math.sqrt(i));
    while (true) {
      pow = n * n;
      if (pow > 1000) {
        break;
      }
      if (pow === i) {
        answer -= i * 2;
      }
      n++;
    }
  }

  return answer;
}
