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
    setLiftStatuses(state) {
      if (localStorage.liftStatuses) {
        return;
      }

      const statuses = [];
      for (let i = 0; i < state.numberOfLifts; i++) {
        statuses.push({ id: i, currentFloor: 1, targetFloor: 1, resting: false});
      }
      state.liftsStatuses = statuses;
    },
    setButtonStatuses(state) {
      if (localStorage.buttonStatuses) {
        return;
      }

      const statuses = [];
      for (let i = 0; i < state.numberOfFloors; i++) {
        statuses.push({ id: i, pressed: false});
      }
      state.buttonStatuses = statuses;
    },
    addToQueue(state, id) {
      if (id in state.callQueue) return;

      state.buttonStatuses[id].pressed = true;
      state.callQueue.push(id);
    },
    activateLift(state, id, target) {
      state.liftsStatuses[id].target = target;
    }
  },
  actions: {},
  modules: {},
});
