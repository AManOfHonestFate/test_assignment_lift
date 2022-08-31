import { createStore } from "vuex";

export default createStore({
  state: {
    numberOfLifts: 4,
    numberOfFloors: 5,
    floorsPerSecond: 1,
    restTime: 3,
    callQueue: [],
    liftsStatuses: [],
    floorHeight: 6
  },
  getters: {
    totalHeight(state) {
      return `${state.numberOfFloors * state.floorHeight}rem`;
    }
  },
  mutations: {},
  actions: {},
  modules: {},
});
