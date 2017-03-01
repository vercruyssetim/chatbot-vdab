import _ from 'lodash';

export default class DataContext {

    constructor(sessionId, user) {
        this.sessionId = sessionId;
        this.user = user;
        this.filters = {};
        this.jobIds = [];
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

    filterJobs(jobs) {
        return _(jobs)
            .filter((job) => this.jobIds.indexOf(job.id) === -1)
            .take(6)
            .value();
    }
}
