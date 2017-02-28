export default class DataContext {

    constructor(sessionId, user) {
        this.sessionId = sessionId;
        this.user = user;
    }

    complete(state, userAction) {
        if (state.completeData) {
            state.completeData(this, userAction);
        }
    }

    start(state, userAction) {
        if (state.startData) {
            state.startData(this, userAction);
        }
    }

    hasLocation() {
        return this.location !== null && this.location !== undefined;
    }

    setLocation(location) {
        this.location = location;
    }
}
