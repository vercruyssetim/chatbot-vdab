import schedule from 'node-schedule';
import Rx from 'rxjs';

export default class SchedulingService {

    constructor(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
        this.schedules = {};
    }

    plan(speech, data, {sessionId, dataTask, speechTask, filterTask, otherTask}) {
        this.stop(sessionId);

        this.scheduleRepository.update({_id: sessionId, sessionId, dataTask, speechTask, filterTask, otherTask});
        let observable = Rx.Observable
            .create((observer) => {
                this.schedules[sessionId] = schedule.scheduleJob({hour: 12, minute:15}, () => observer.next());
            })
            .flatMap(() => dataTask())
            .map((result) => filterTask(result, data))
            .share();

        observable
            .subscribe((result) => speechTask(result, speech));

        observable
            .subscribe((result) => otherTask(result, data));
    }

    stop(sessionId) {
        if (this.schedules[sessionId]) {
            this.schedules[sessionId].cancel();
        }
    }


}
