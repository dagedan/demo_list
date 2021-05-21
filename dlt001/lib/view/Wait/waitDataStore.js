import {List, fromJS} from 'immutable';
import {createStore, createEvent} from 'effector';
import {Toast} from '@ant-design/react-native';

export const changeSelectedRedBall = createEvent();
export const clearSelectedRedBall = createEvent();

export const $selectedRedBall = createStore(List([]))
  .on(changeSelectedRedBall, (store, selectedNum) => {
    if (store.includes(selectedNum)) {
      return store.delete(store.indexOf(selectedNum));
    } else {
      if (store.size === 5) {
        Toast.fail('单注只能选择5个号码', 1, () => {}, false);
        return store;
      } else {
        return store.push(selectedNum);
      }
    }
  })
  .reset(clearSelectedRedBall);

export const changeSelectedBlueBall = createEvent();
export const clearSelectedBlueBall = createEvent();
export const $selectedBlueBall = createStore(List([]))
  .on(changeSelectedBlueBall, (store, selectedNum) => {
    if (store.includes(selectedNum)) {
      return store.delete(store.indexOf(selectedNum));
    } else {
      if (store.size === 2) {
        Toast.fail('单注只能选择2个号码', 1, () => {}, false);
      } else {
        return store.push(selectedNum);
      }
    }
  })
  .reset(clearSelectedBlueBall);

export const changeSelectedPeroid = createEvent();

export const selectedPeriod = createStore('').on(
  changeSelectedPeroid,
  (store, period) => {
    store = period;
    return period;
  },
);

export const changeAllPeroid = createEvent();

export const allPeriod = createStore(List([])).on(
  changeAllPeroid,
  (store, period) => {
    store = period;
    return fromJS(period);
  },
);
