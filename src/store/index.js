import { createStore } from "vuex";

export default createStore({
  state: {
    // global settings
    numberOfLifts: 3,
    numberOfFloors: 5,
    floorsPerSecond: 1,
    restTime: 3, // sec
    floorHeight: 5.5, // rem

    // app states
    // saving in localStorage
    callQueue: [],
    liftsStatuses: [],
    buttonStatuses: [],
  },
  getters: {
    totalHeight(state) {
      return `${state.numberOfFloors * state.floorHeight}rem`;
    },
    freeLifts(state) {
      return state.liftsStatuses.filter((lift) => {
        return !(lift.targetFloor !== lift.currentFloor || lift.resting);
      });
    },
    floorsWithLifts(state) {
      return new Set(state.liftsStatuses.map((lift) => lift.targetFloor));
    },
  },
  mutations: {
    setLiftStatuses(state) {
      if (localStorage.liftStatuses) {
        return;
      }

      const statuses = [];
      for (let i = 0; i < state.numberOfLifts; i++) {
        statuses.push({
          id: i,
          currentFloor: 0,
          targetFloor: 0,
          resting: false,
        });
      }
      state.liftsStatuses = statuses;
    },
    setButtonStatuses(state) {
      if (localStorage.buttonStatuses) {
        return;
      }

      const statuses = [];
      for (let i = 0; i < state.numberOfFloors; i++) {
        statuses.push({ id: i, pressed: false });
      }
      state.buttonStatuses = statuses;
    },
  },
  actions: {
    activateLift({ state, dispatch }, { id, target }) {
      // activates lift
      const lift = state.liftsStatuses[id];
      lift.targetFloor = target;

      // waits for lift to stop
      setTimeout(() => {

        // then lift starts to rest
        lift.resting = true;
        lift.currentFloor = target;
        state.buttonStatuses[target].pressed = false;

        setTimeout(() => {
          // when rest time is over
          // resets lift
          lift.resting = false;
          // and resolve lifts again
          dispatch("resolveLifts");
        }, 3000);
      }, Math.abs(lift.targetFloor - lift.currentFloor) * state.floorsPerSecond * 1000);
    },
    addToQueue({ state, getters }, id) {
      // checks if the button can be pressed
      if (state.callQueue.includes(id)) return;
      if (getters.floorsWithLifts.has(id)) return;

      // presses the button and adds call to queue
      state.buttonStatuses[id].pressed = true;
      state.callQueue.push(id);
    },
    resolveLifts({ state, getters, dispatch }) {

      // checks if there's free lifts and call queue
      if (!state.callQueue.length) return;
      if (!getters.freeLifts.length) return;

      // finds the closest lift
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

      // deletes current call from queue and activates lift
      state.callQueue.shift();
      dispatch("activateLift", { id: minId, target: targetFloor });
    },
  },
  modules: {},
});
