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

export const calcLotteryMoney = (myNum, lotteryNum) => {
  const redNumBingo = _.difference(
    myNum.split(' ').slice(0, 5),
    lotteryNum.split(' ').slice(0, 5),
  );
  const blueNumBingo = _.difference(
    myNum.split(' ').slice(5, 7),
    lotteryNum.split(' ').slice(5, 7),
  );
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
      money: '中了二等大奖',
    };
  }
  if (redNumBingo === 5 && blueNumBingo === 2) {
    return {
      level: '一等奖',
      money: '中了一等大奖',
    };
  }
};
