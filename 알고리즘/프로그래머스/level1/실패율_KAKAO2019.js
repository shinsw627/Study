function solution(N, stages) {
  var answer = [];
  let arr = [];
  let count = [];

  for (let i = 0; i < N; i++) {
    arr.push(0);
    count.push(0);
  }
  for (let i = 0; i < stages.length; i++) {
    if (stages[i] === N + 1) {
      arr = arr.map((a) => a + 1);
      count = count.map((a) => a + 1);
    } else {
      for (let k = 0; k < stages[i] - 1; k++) {
        arr[k] += 1;
      }
      for (let k = 0; k < stages[i]; k++) {
        count[k] += 1;
      }
    }
  }
  for (let i = 0; i < count.length; i++) {
    answer.push({ stage: i + 1, failValue: (count[i] - arr[i]) / count[i] });
  }
  answer.sort(function (a, b) {
    if (a.failValue > b.failValue) {
      return -1;
    }
    if (a.failValue < b.failValue) {
      return 1;
    }
    return 0;
  });
  console.log(answer);
  answer = answer.map((a) => (a = a.stage));
  return answer;
}
