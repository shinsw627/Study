let A = "LLOOVVVEEEE";

console.log(A.match(/L/g).length);

let inputData = ["MERYLOV", "5", "JOHN", "DAVE", "STEVE", "JOHN", "DAVE"];
let dataArray = [];
for (let i = 2; i < Number(inputData[1]) + 2; i++) {
  dataArray.push(inputData[i]);
}
dataArray.sort();
let array = [];

let answer;

let L1 = inputData[0].match(/L/g)?.length ? inputData[0].match(/L/g).length : 0;
console.log("L1: " + L1);
let O1 = inputData[0].match(/O/g)?.length ? inputData[0].match(/O/g).length : 0;
let V1 = inputData[0].match(/V/g)?.length ? inputData[0].match(/V/g).length : 0;
let E1 = inputData[0].match(/E/g)?.length ? inputData[0].match(/E/g).length : 0;

for (let i = 0; i < Number(inputData[1]); i++) {
  let L =
    L1 +
    (dataArray[i].match(/L/g)?.length ? dataArray[i].match(/L/g).length : 0);
  console.log(L);
  let O =
    O1 +
    (dataArray[i].match(/O/g)?.length ? dataArray[i].match(/O/g).length : 0);
  let V =
    V1 +
    (dataArray[i].match(/V/g)?.length ? dataArray[i].match(/V/g).length : 0);
  let E =
    E1 +
    (dataArray[i].match(/E/g)?.length ? dataArray[i].match(/E/g).length : 0);

  array.push(((L + O) * (L + V) * (L + E) * (O + V) * (O + E) * (V + E)) % 100);
}
console.log(dataArray);
console.log(dataArray[array.indexOf(Math.max(...array))]);
