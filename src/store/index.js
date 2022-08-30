import { createStore } from "vuex";

export default createStore({
  state: {
    numberOfLifts: 1,
    numberOfFloors: 5,
    floorsPerSecond: 1,
    restTime: 3,
    callQueue: [],
    liftsStatuses: []
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
