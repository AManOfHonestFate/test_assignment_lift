const queue = {
  getters: {
    // floors with no need to call lift
    floorsWithLifts(state, getters, rootState) {
      return new Set(rootState.liftsStatuses.map((lift) => lift.targetFloor));
    },
  },
  actions: {
    // adds call for lift to queue
    addToQueue({ rootState, getters }, id) {
      // checks if the button can be pressed
      if (rootState.callQueue.includes(id)) return;
      if (getters.floorsWithLifts.has(id)) return;

      // presses the button and adds call to queue
      rootState.buttonStatuses[id].pressed = true;
      rootState.callQueue.push(id);
    },
  },
};

export default queue;
