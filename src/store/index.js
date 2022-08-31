import { createStore } from "vuex";

export default createStore({
  state: {
    numberOfLifts: 4,
    numberOfFloors: 5,
    floorsPerSecond: 1,
    restTime: 3,  // sec
    callQueue: [],
    liftsStatuses: [],
    buttonStatuses: [],
    floorHeight: 6   // rem
  },
  getters: {
    totalHeight(state) {
      return `${state.numberOfFloors * state.floorHeight}rem`;
    }
  },
  mutations: {
    setStatuses(state) {
      if (localStorage.statuses) {
        return;
      }

      const statuses = [];
      for (let i in 4) {
        statuses.push({ id: i, targetFloor: 1});
      }
      state.liftsStatuses = statuses;
    }
  },
  actions: {},
  modules: {},
});
