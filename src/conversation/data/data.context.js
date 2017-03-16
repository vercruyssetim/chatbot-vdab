export default class DataContext {

    constructor(sessionId, user) {
        this.data = {
            sessionId,
            user,
            filters: {},
            jobIds: []
        };
    }

    complete(state, userAction) {
        if (state.completeData) {
            state.completeData(this.data, userAction);
        }
    }

    start(state, userAction) {
        if (state.startData) {
            state.startData(this.data, userAction);
        }
    }
}
