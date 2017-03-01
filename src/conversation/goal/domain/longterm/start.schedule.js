import applicationConfig from '../../../../applicationConfig';
import HasLocationGoal from '../shortterm/has.location.goal';
import HasKeywordGoal from '../shortterm/has.keyword.goal';
import BackendService from '../../../../backend/backend.service';
import Rx from 'rxjs';

export default class StartSchedule {

    constructor() {
        this.shorttermGoals = [
            new HasLocationGoal(),
            new HasKeywordGoal()
        ];
        this.vindEenJobClient = applicationConfig.getVindEenJobClient();
        this.schedulingService = applicationConfig.getSchedulingService();
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start() {

    }

    completeData(data) {
        this.observable = this.schedulingService.schedule(data.sessionId)
            .flatMap(() => this.vindEenJobClient.lookupJobs({
                keyword: data.keyword,
                location: data.location,
                filters: data.filters,
                limit: '30'
            }))
            .map((jobs) => data.filterJobs(jobs))
            .share();

        this.observable
            .flatMap((jobs) => Rx.Observable.from(jobs))
            .map((job) => job.id)
            .subscribe((jobId) => data.jobIds.push(jobId));
    }

    complete(speech) {
        speech.addMessage('Vanaf nu zal ik je één keer per dag nieuwe vacatures sturen');
        speech.send();
        this.observable.subscribe((jobs) => {
            if (jobs.length !== 0) {
                speech.addMessage('Hier zijn je dagelijkse jobs!');
                speech.addElements(BackendService.mapToElements(jobs));
                speech.addDelay(3000);
                speech.send();
            }
        });
    }
}
