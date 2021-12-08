const fs = require("fs");
const inputData = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `So when I die (the [first] I will see in (heaven) is a score list).
[ first in ] ( first out ).
Half Moon tonight (At least it is better than no Moon at all].
A rope may form )( a trail in a maze.
Help( I[m being held prisoner in a fortune cookie factory)].
([ (([( [ ] ) ( ) (( ))] )) ]).
  .
.`
)
  .trim()
  .split("\n");

for (let i = 0; i < inputData.length; i++) {
  let answer = "yet";
  let array = [];
  let inputDataArray = inputData[i].split("");
  if (inputDataArray.length === 1) {
    answer = "NaN";
  }
  for (let j = 0; j < inputDataArray.length; j++) {
    if (inputDataArray[j] === "(" || inputDataArray[j] === "[") {
      array.push(inputDataArray[j]);
    } else if (inputDataArray[j] === ")" || inputDataArray[j] === "]") {
      if (array.pop() !== (inputDataArray[j] === ")" ? "(" : "[")) {
        console.log("no");
        answer = "no";
        break;
      }
    }
  }
  if (answer !== "no") {
    if (answer === "NaN") {
    } else if (array.length === 0) {
      console.log("yes");
    } else {
      console.log("no");
    }
  }
}
