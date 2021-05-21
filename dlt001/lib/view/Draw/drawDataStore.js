import {createStore, createEvent} from 'effector';

export const changeCurrentPeriod = createEvent();
export const $currentPeriod = createStore('').on(
  changeCurrentPeriod,
  (store, period) => {
    store = period;
    return period;
  },
);
