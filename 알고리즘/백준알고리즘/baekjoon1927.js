const fs = require("fs");
const [n, ...input] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `9
0
12345678
1
2
0
0
0
0
32`
)
  .trim()
  .split("\n");

const num = input.map((v) => +v);

class MinHeap {
  constructor() {
    this.heap = [];
  }

  empty() {
    if (this.heap.length == 0) {
      return true;
    }
    return false;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  //최소값 부모로 이동 upup
  bubbleUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[parentIndex] <= this.heap[currentIndex]) break;

      //부모와 자식 변경
      [this.heap[currentIndex], this.heap[parentIndex]] = [
        this.heap[parentIndex],
        this.heap[currentIndex],
      ];
      currentIndex = parentIndex;
    }
  }

  //최소값(최상단노드 추출)
  extractMin() {
    if (this.heap.length == 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);

    return min;
  }

  //내려가며 자식노드들이랑 비교해서 인덱스와 값 변경
  sinkDown(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    const length = this.heap.length;
    let largestIndex = index;

    // 왼쪽 자식노드랑 비교
    if (leftIndex < length && this.heap[leftIndex] < this.heap[largestIndex]) {
      largestIndex = leftIndex;
    }

    // 오른쪽 자식노드랑 비교
    if (
      rightIndex < length &&
      this.heap[rightIndex] < this.heap[largestIndex]
    ) {
      largestIndex = rightIndex;
    }
    //
    if (largestIndex !== index) {
      [this.heap[index], this.heap[largestIndex]] = [
        this.heap[largestIndex],
        this.heap[index],
      ];
      this.sinkDown(largestIndex);
    }
  }
}

const answer = [];
const minHeap = new MinHeap();
num.forEach((v) => {
  if (v == 0) {
    if (minHeap.empty()) {
      answer.push(0);
    } else {
      answer.push(minHeap.extractMin());
    }
  } else {
    minHeap.insert(v);
  }
});

console.log(answer.join("\n"));
