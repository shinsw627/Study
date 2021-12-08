const fs = require("fs");
const input = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `14
push 1
push 2
top
size
empty
pop
pop
pop
size
empty
pop
push 3
empty
top`
)
  .trim()
  .split("\n");

const cases = Number(input[0]);
const stack = [];
const arr = [];

for (let i = 1; i <= cases; i++) {
  const command = input[i].split(" ");
  switch (command[0]) {
    case "pop":
      arr.push(stack.pop() || -1);
      console.log(arr);
      break;
    case "size":
      arr.push(stack.length);
      break;
    case "empty":
      arr.push(stack[0] ? 0 : 1);
      break;
    case "top":
      arr.push(stack[stack.length - 1] || -1);
      break;
    case "push":
      stack.push(command[1]);
      break;
  }
}
console.log(arr.join("\n"));
