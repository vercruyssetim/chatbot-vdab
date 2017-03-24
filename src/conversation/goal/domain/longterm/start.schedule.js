import applicationConfig from '../../../../applicationConfig';
import HasLocationGoal from '../shortterm/has.location.goal';
import HasKeywordGoal from '../shortterm/has.keyword.goal';
import BackendService from '../../../../backend/backend.service';
import Rx from 'rxjs';
import _ from 'lodash';

export default class StartSchedule {

    constructor(data) {
        this.shorttermGoals = [
            new HasLocationGoal(data),
            new HasKeywordGoal(data)
        ];
        this.vindEenJobClient = applicationConfig.getVindEenJobClient();
        this.schedulingService = applicationConfig.getSchedulingService();
        this.name =  'startSchedule';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start() {

    }

    completeData({sessionId, vindEenJob, jobIds}) {
        this.observable = this.schedulingService.schedule(sessionId)
            .flatMap(() => this.vindEenJobClient.lookupJobs({
                keyword: vindEenJob.keyword,
                location: vindEenJob.location,
                filters: vindEenJob.filters,
                limit: '30'
            }))
            .map((jobs) => this.filterJobs(jobs, jobIds))
            .share();

        this.observable
            .flatMap((jobs) => Rx.Observable.from(jobs))
            .map((job) => job.id)
            .subscribe((jobId) => jobIds.push(jobId));
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

    filterJobs(jobs, jobIds) {
        return _(jobs)
            .filter((job) => jobIds.indexOf(job.id) === -1)
            .take(6)
            .value();
    }
}
