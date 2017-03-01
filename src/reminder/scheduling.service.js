import schedule from 'node-schedule';
import Rx from 'rxjs';

export default class SchedulingService {
    constructor() {
        this.schedules = {};
    }

    schedule(sessionId) {
        this.stop(sessionId);
        return Rx.Observable.create((observer) => {
            this.schedules[sessionId] = schedule.scheduleJob({hour: 12, minute: 15, dayOfWeek: 0}, () => observer.next());
        });
    }

    stop(sessionId) {
        if (this.schedules[sessionId]) {
            this.schedules[sessionId].cancel();
        }
    }
}
