function colorValue(color) {
  switch (color) {
    case "black":
      return 0;
    case "brown":
      return 1;
    case "red":
      return 2;
    case "orange":
      return 3;
    case "yellow":
      return 4;
    case "green":
      return 5;
    case "blue":
      return 6;
    case "violet":
      return 7;
    case "grey":
      return 8;
    case "white":
      return 9;
  }
}
const A = "yellow";
const B = "violet";
const C = "red";
let answer =
  colorValue(A) * Math.pow(10, colorValue(C) + 1) +
  colorValue(B) * Math.pow(10, colorValue(C));

console.log(answer);
