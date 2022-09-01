const liftsLogic = {
    getters: {
        // array of lifts that are free to ride
        freeLifts(state, getters, rootState) {
            return rootState.liftsStatuses.filter((lift) => {
                return !(lift.targetFloor !== lift.currentFloor || lift.resting);
            });
        },
    },
    actions: {
        // activates lift
        // waits for it to come to the target
        // rests and resets
        activateLift({ rootState, dispatch }, { id, target }) {
            // activates lift
            const lift = rootState.liftsStatuses[id];
            lift.targetFloor = target;

            // waits for lift to stop
            setTimeout(() => {

                // then lift starts to rest
                lift.resting = true;
                lift.currentFloor = target;
                rootState.buttonStatuses[target].pressed = false;

                setTimeout(() => {
                    // when rest time is over
                    // resets lift
                    lift.resting = false;
                    // and resolve lifts again
                    dispatch("resolveLifts");
                }, 3000);
            }, Math.abs(lift.targetFloor - lift.currentFloor) * rootState.floorsPerSecond * 1000);
        },
        // finds the closest lift to the target floor
        // and activates it
        resolveLifts({ rootState, getters, dispatch }) {
            // checks if there's free lifts and call queue
            if (!rootState.callQueue.length) return;
            if (!getters.freeLifts.length) return;

            // finds the closest lift
            const targetFloor = rootState.callQueue[0];
            let min = rootState.numberOfFloors;
            let minId = 0;
            for (let lift of getters.freeLifts) {
                const diff = Math.abs(lift.currentFloor - targetFloor);
                if (Math.abs(lift.currentFloor - targetFloor) < min) {
                    min = diff;
                    minId = lift.id;
                }
            }

            // deletes current call from queue and activates lift
            rootState.callQueue.shift();
            dispatch("activateLift", { id: minId, target: targetFloor });
        },
    },
}

export default liftsLogic;