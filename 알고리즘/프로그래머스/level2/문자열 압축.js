function solution(s) {
  var answer = 0;
  let answerArray = [];

  for (let i = 1; i < s.length / 2 + 1; i++) {
    let j = 0;
    let count = 1;
    let str = "";
    while (true) {
      if (j > s.length) break;
      let finder = s.substring(j, j + i);
      let target = s.substring(j + i, j + 2 * i);

      if (finder === target) {
        count++;
      } else {
        if (count > 1) {
          str += count + finder;
          count = 1;
        } else {
          str += finder;
          count = 1;
        }
      }
      j += i;
    }
    answerArray.push(str.length);
  }
  answer = Math.min(...answerArray);

  return answer;
}
