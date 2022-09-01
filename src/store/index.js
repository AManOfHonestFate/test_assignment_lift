import { createStore } from "vuex";
import queue from "@/store/queue";
import liftsLogic from "@/store/liftsLogic";

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
    // total height of main container div
    totalHeight(state) {
      return `${state.numberOfFloors * state.floorHeight}rem`;
    },
  },
  mutations: {
    // commits on mounted of lift app
    setLiftStatuses(state) {

      // checks local storage for saved state
      if (localStorage.liftStatuses) {
        state.liftsStatuses = JSON.parse(localStorage.liftStatuses);
        state.liftsStatuses.forEach(lift => {
          lift.currentFloor = lift.targetFloor;
          lift.resting = false;
        })
        return;
      }

      // else basic init
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
    // commits on mounted of lift app
    setButtonStatuses(state) {

      // checks local storage for saved state
      if (localStorage.buttonStatuses) {
        state.buttonStatuses = JSON.parse(localStorage.buttonStatuses);
        state.buttonStatuses.forEach(button => {
          if (!state.callQueue.includes(button.id)) {
            button.pressed = false;
          }
        })
        return;
      }

      // else basic init
      const statuses = [];
      for (let i = 0; i < state.numberOfFloors; i++) {
        statuses.push({ id: i, pressed: false });
      }
      state.buttonStatuses = statuses;
    },
    // commits on mounted of lift app
    setQueue(state) {
      if (localStorage.queue) {
        state.callQueue = JSON.parse(localStorage.queue);
      }
    }
  },
  actions: {
    loadLocalStates({ commit }) {
      commit('setQueue');
      commit('setButtonStatuses');
      commit('setLiftStatuses');
    },
    saveLocalStates({ state }) {
      localStorage.buttonStatuses = JSON.stringify(state.buttonStatuses);
      localStorage.liftStatuses = JSON.stringify(state.liftsStatuses);
      localStorage.queue = JSON.stringify(state.callQueue);
    }
  },
  modules: {
    queue,
    liftsLogic
  },
});
