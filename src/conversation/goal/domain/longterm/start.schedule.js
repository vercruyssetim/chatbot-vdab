import applicationConfig from '../../../../applicationConfig';
import HasLocationGoal from '../shortterm/has.location.goal';
import HasKeywordGoal from '../shortterm/has.keyword.goal';
import BackendService from '../../../../backend/backend.service';
import Rx from 'rxjs';
import _ from 'lodash';
import ConfirmInputGoal from '../shortterm/confirm.input.goal';
import ConfirmSchedule from '../shortterm/confirm.schedule';
import Schedule from '../../../../reminder/schedule';

export default class StartSchedule {

    constructor(data) {
        this.shorttermGoals = [
            new ConfirmSchedule(data),
            new ConfirmInputGoal(data),
            new HasLocationGoal(data),
            new HasKeywordGoal(data)
        ];
        data.vindEenJob = data.vindEenJob ? data.vindEenJob : {filters: {}};

        this.vindEenJobClient = applicationConfig.getVindEenJobClient();
        this.schedulingService = applicationConfig.getSchedulingService();
        this.schedule = {};
        this.name =  'startSchedule';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    completeData({sessionId, vindEenJob}) {
        this.schedule = Schedule.aSchedule()
            .withSessionId(sessionId)
            .withDataTask(() =>  this.vindEenJobClient.lookupJobs({
                keyword: vindEenJob.keyword,
                location: vindEenJob.location,
                filters: vindEenJob.filters,
                limit: '30'
            }))
            .withFilterTask((jobs, {jobIds}) => this.filterJobs(jobs, jobIds));
    }

    complete(speech, {user, jobIds}) {
        speech.addMessage('Super! Dan zie ik je morgen. <Harry wuift>');
        speech.send();

        this.schedule.withSpeechTask((jobs, speech) => {
            if (jobs.length !== 0) {
                speech.addMessage(`Dag ${user.firstName}, zoals beloofd: je dagelijkse portie verse jobs!`);
                speech.addElements(BackendService.mapToElements(jobs));
                speech.addDelay(3000);
                speech.addQuickReplies('Ben je me beu? Schakel me uit. Ik beloof dat ik het je niet kwalijk neem. <Harry wuift>', [{value: 'kan je me geen berichten meer sturen?', label: 'Schakel me uit'}]);
                speech.send();
            }
        });

        this.schedule.withOtherTask((jobs, {jobIds}) => {
            Rx.Observable.from(jobs)
                .map((job) => job.id)
                .subscribe((jobId) => jobIds.push(jobId));
        });

        this.schedulingService.plan(speech, {jobIds}, this.schedule);
    }

    filterJobs(jobs, jobIds) {
        return _(jobs)
            .filter((job) => jobIds.indexOf(job.id) === -1)
            .take(6)
            .value();
    }
}
