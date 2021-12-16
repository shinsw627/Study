function solution(nums) {
  var answer = 0;
  let n = nums.length;
  const set = new Set(nums);
  const monTypeCount = [...set].length;
  if (n / 2 >= monTypeCount) {
    answer = monTypeCount;
  } else {
    answer = n / 2;
  }
  console.log(123);
  return answer;
}
