function first_try(board, moves) {
  let answer = [];
  let count = 0;

  for (const move of moves) {
    for (let i = 0; i < board.length; i++) {
      let floor = board[i];
      if (floor[move - 1] !== 0) {
        answer.push(floor[move - 1]);
        floor[move - 1] = 0;
        break;
      }
    }
    if (answer.length >= 2) {
      for (let i = answer.length - 1; i > 0; i--) {
        if (answer[i] === answer[i - 1]) {
          count++;
          answer.pop();
          answer.pop();
        }
      }
    }
  }
  return count * 2;
}

function second_try(board, moves) {
  let answer = [];
  let count = 0;

  for (const move of moves) {
    for (let i = 0; i < board.length; i++) {
      let floor = board[i];
      if (floor[move - 1] !== 0) {
        // 여기가 중요... 스택에 넣기전에 비교해서 빼버린다!!!
        if (floor[move - 1] === answer[answer.length - 1]) {
          answer.pop();
          count += 2;
        } else {
          answer.push(floor[move - 1]);
        }
        console.log(answer);
        floor[move - 1] = 0;
        break;
      }
    }
  }
  return count;
}

let board = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 3],
  [0, 2, 5, 0, 1],
  [4, 2, 4, 4, 2],
  [3, 5, 1, 3, 1],
];
let moves = [1, 5, 3, 5, 1, 2, 1, 4];

console.log(Date.now());
// console.log(first_try(board, moves));
console.log(Date.now());
console.log(second_try(board, moves));
console.log(Date.now());
