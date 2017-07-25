export default class Schedule {
    constructor() {
        this.sessionId = '';
        this.dataTask = () => {};
        this.filterTask = (x) => x;
        this.speechTask = () => {};
        this.otherTask = () => {};
    }

    static aSchedule() {
        return new Schedule();
    }

    withSessionId(sessionId) {
        this.sessionId = sessionId;
        return this;
    }

    withDataTask(dataTask) {
        this.dataTask = dataTask;
        return this;
    }

    withFilterTask(filterTask) {
        this.filterTask = filterTask;
        return this;
    }

    withSpeechTask(speechTask) {
        this.speechTask = speechTask;
        return this;
    }

    withOtherTask(otherTask) {
        this.otherTask = otherTask;
        return this;
    }
}
