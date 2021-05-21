import _ from 'lodash';
export const zoomLevelToDiameter = zoomLevel => {
  switch (zoomLevel) {
    case 13:
      return 300;
    case 14:
      return 200;
    case 15:
      return 100;
    case 16:
      return 70;
    case 17:
      return 30;
    case 18:
      return 20;
    case 19:
      return 10;
    case 20:
      return 5;
    default:
      return 100;
  }
};

export const calcLotteryMoney = (myNums, lotteryNum) => {
  if (!lotteryNum) {
    return {
      level: '未开奖',
      money: '...',
    };
  }
  const redNumBingo =
    5 -
    _.difference(
      myNums.split(' ').slice(0, 5),
      lotteryNum.split(' ').slice(0, 5),
    ).length;
  const blueNumBingo =
    2 -
    _.difference(
      myNums.split(' ').slice(5, 7),
      lotteryNum.split(' ').slice(5, 7),
    ).length;
  if (
    (redNumBingo === 2 && blueNumBingo === 1) ||
    (redNumBingo === 3 && blueNumBingo === 0) ||
    (redNumBingo === 1 && blueNumBingo === 2) ||
    (redNumBingo === 0 && blueNumBingo === 2)
  ) {
    return {
      level: '九等奖',
      money: 5,
    };
  }
  if (
    (redNumBingo === 3 && blueNumBingo === 1) ||
    (redNumBingo === 2 && blueNumBingo === 2)
  ) {
    return {
      level: '八等奖',
      money: 15,
    };
  }
  if (redNumBingo === 4 && blueNumBingo === 0) {
    return {
      level: '七等奖',
      money: 100,
    };
  }
  if (redNumBingo === 3 && blueNumBingo === 2) {
    return {
      level: '六等奖',
      money: 200,
    };
  }
  if (redNumBingo === 3 && blueNumBingo === 2) {
    return {
      level: '五等奖',
      money: 300,
    };
  }
  if (redNumBingo === 4 && blueNumBingo === 2) {
    return {
      level: '四等奖',
      money: 3000,
    };
  }
  if (redNumBingo === 5 && blueNumBingo === 0) {
    return {
      level: '三等奖',
      money: 10000,
    };
  }
  if (redNumBingo === 5 && blueNumBingo === 1) {
    return {
      level: '二等奖',
      money: '100000',
    };
  }
  if (redNumBingo === 5 && blueNumBingo === 2) {
    return {
      level: '一等奖',
      money: '10000000',
    };
  }
  return {
    level: '未中奖',
    money: 0,
  };
};

export const isLotteryBingo = (myNum, lotteryNum, origin) => {
  if (!lotteryNum) {
    return true;
  }
  const redOrigin = lotteryNum.split(' ').slice(0, 5);
  const blueOrigin = lotteryNum.split(' ').slice(5, 7);
  if (origin === 'red') {
    return redOrigin.indexOf(myNum) === -1;
  }
  if (origin === 'blue') {
    return blueOrigin.indexOf(myNum) === -1;
  }
};

const BallFactory = len => {
  let tmpBallList = [];
  for (let i = 1; i <= len; i++) {
    i < 10 ? tmpBallList.push('0' + i) : tmpBallList.push(i);
  }
  return tmpBallList;
};
export const redBall = BallFactory(35);
export const blueBall = BallFactory(12);

export const createAllPeriod = currentPeriod => {
  let data = [];
  const firstPeriod = parseInt(
    new Date().getFullYear().toString().substr(2, 2) + '001',
    10,
  );
  for (let i = firstPeriod; i < firstPeriod + 156; i++) {
    if (i > currentPeriod) {
      data.push(i);
    }
  }
  return data;
};
