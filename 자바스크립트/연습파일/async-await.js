const delay = (sec) => {
  return new Promise((resolve) => setTimeout(resolve, sec));
};

async function apple() {
  await delay(2000);
  return "apple";
}

async function banana() {
  await delay(1000);
  return "banana";
}

async function pickFruits() {
  const getapple = await apple();
  const getbanana = await banana();
  return `${getapple} + ${getbanana}`;
}

pickFruits().then(console.log);
