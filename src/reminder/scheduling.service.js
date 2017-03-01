import schedule from 'node-schedule';
import Rx from 'rxjs';

export default class SchedulingService {
    constructor() {
        this.schedules = {};
    }

    schedule(sessionId) {
        return Rx.Observable.create((observer) => {
            this.stop(sessionId);
            this.schedules[sessionId] = schedule.scheduleJob(new schedule.RecurrenceRule(), () => {
                console.log('triggered');
                observer.next();
            });
        });
    }

    stop(sessionId) {
        if (this.schedules[sessionId]) {
            this.schedules[sessionId].cancel();
        }
    }
}
