import { createStore } from "vuex";

export default createStore({
  state: {
    numberOfLifts: 3,
    numberOfFloors: 5,
    floorsPerSecond: 1,
    restTime: 3,  // sec
    callQueue: [],
    liftsStatuses: [],
    buttonStatuses: [],
    floorHeight: 5.5   // rem
  },
  getters: {
    totalHeight(state) {
      return `${state.numberOfFloors * state.floorHeight}rem`;
    },
    freeLifts(state) {
      return state.liftsStatuses.filter(lift => {
        return !(lift.targetFloor !== lift.currentFloor || lift.resting);
      })
    },
    floorsWithLifts(state) {
      return new Set(state.liftsStatuses.map(lift => lift.targetFloor));
    }
  },
  mutations: {
    setLiftStatuses(state) {
      if (localStorage.liftStatuses) {
        return;
      }

      const statuses = [];
      for (let i = 0; i < state.numberOfLifts; i++) {
        statuses.push({ id: i, currentFloor: 0, targetFloor: 0, resting: false});
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
  },
  actions: {
    activateLift({ state, dispatch}, {id, target}) {
      const lift = state.liftsStatuses[id];

      lift.targetFloor = target;

      setTimeout(() => {
        lift.resting = true;
        lift.currentFloor = target;
        state.buttonStatuses[target].pressed = false;

        setTimeout(() => {
          lift.resting = false;
          dispatch('resolveLifts');
        }, 3000);
      }, Math.abs(lift.targetFloor - lift.currentFloor) * state.floorsPerSecond * 1000);
    },
    addToQueue({ state, getters}, id) {
      if (state.callQueue.includes(id)) return;
      if (getters.floorsWithLifts.has(id)) return;

      state.buttonStatuses[id].pressed = true;
      state.callQueue.push(id);
    },
    resolveLifts({ state, getters, dispatch}) {
      if (!state.callQueue.length) return;
      if (!getters.freeLifts.length) return;

      const targetFloor = state.callQueue[0];
      let min = state.numberOfFloors;
      let minId = 0;
      for (let lift of getters.freeLifts) {
        const diff = Math.abs(lift.currentFloor - targetFloor);
        if (Math.abs(lift.currentFloor - targetFloor) < min) {
          min = diff;
          minId = lift.id;
        }
      }

      state.callQueue.shift();
      dispatch('activateLift', {id: minId, target: targetFloor});
    }
  },
  modules: {},
});
