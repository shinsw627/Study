const [n, ...arr] = (
  process.platform === "linux"
    ? require("fs").readFileSync("/dev/stdin").toString()
    : `15
push 1
push 2
front
back
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
front`
)
  .trim()
  .split("\n");

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  createNode(value, prev, next) {
    return {
      value,
      prev,
      next,
    };
  }

  push(value) {
    const curNode = this.createNode(value, this.tail, this.head);
    if (this.head) {
      this.tail.next = curNode;
      this.head.prev = curNode;
      this.tail = curNode;
    } else {
      this.head = curNode;
      this.tail = curNode;
      curNode.prev = curNode;
      curNode.next = curNode;
    }
    this.size++;
  }

  pop() {
    if (this.size > 2) {
      const value = this.head.value;
      const newHead = this.head.next;
      this.head = newHead;
      newHead.prev = this.tail;
      this.tail.next = this.head;
      this.size--;
      return value;
    } else if (this.size === 2) {
      const value = this.head.value;
      this.head = this.tail;
      this.tail.prev = this.tail;
      this.tail.next = this.tail;
      this.size--;
      return value;
    } else if (this.size === 1) {
      const value = this.head.value;
      this.head = null;
      this.tail = null;
      this.size--;
      return value;
    } else {
      return -1;
    }
  }

  empty() {
    return this.size ? 0 : 1;
  }

  front() {
    return this.head ? this.head.value : -1;
  }

  back() {
    return this.tail ? this.tail.value : -1;
  }
}

const queue = new Queue();
const answer = [];

let command;

for (let i = 0; i < Number(n); i++) {
  command = arr[i].split(" ");
  switch (command[0]) {
    case "push":
      queue.push(command[1]);
      break;
    case "pop":
      answer.push(queue.pop());
      break;
    case "front":
      answer.push(queue.front());
      break;
    case "back":
      answer.push(queue.back());
      break;
    case "size":
      answer.push(queue.size);
      break;
    case "empty":
      answer.push(queue.empty());
      break;
  }
}
console.log(answer.join("\n"));
