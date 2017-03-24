import HasLocationGoal from '../shortterm/has.location.goal';
import HasKeywordGoal from '../shortterm/has.keyword.goal';
import applicationConfig from '../../../../applicationConfig';
import BackendService from '../../../../backend/backend.service';
import FilterGoal from '../shortterm/has.filter.goal';
import GoalFactory from '../../goal.factory';

export default class VindEenJobGoal {

    constructor(data, {filter}) {
        this.shorttermGoals = [
            new HasLocationGoal(data),
            new HasKeywordGoal(data),
            new FilterGoal(data, filter)
        ];

        data.vindEenJob = data.vindEenJob ? data.vindEenJob : {filters: {}};
        data.vindEenJob.clearData = !filter;
        if(data.vindEenJob.clearData) {
            data.vindEenJob.location= null;
            data.vindEenJob.keyword = null;
            data.vindEenJob.filters = {};
        }

        this.vindEenJobClient = applicationConfig.getVindEenJobClient();
        this.filterService = applicationConfig.getFilterService();
        this.name = 'VindEenJob';
    }

    startData({vindEenJob}, userAction) {
        if (vindEenJob.clearData) {

            let {location, company, profession} = userAction.entities;
            if (location) {
                vindEenJob.location = location;
            }

            if (company) {
                vindEenJob.keyword = company;
            }

            if (profession) {
                vindEenJob.keyword = profession;
            }
        }
    }

    completeData({vindEenJob}) {
        this.promise = this.vindEenJobClient.lookupJobs({
            keyword: vindEenJob.keyword,
            location: vindEenJob.location,
            filters: vindEenJob.filters,
            limit: '5'
        });
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech, {vindEenJob}) {
        if (!vindEenJob.location && !vindEenJob.keyword) {
            speech.addMessage('Laten we een job voor je zoeken');
            speech.send();
        }
    }

    complete(speech, {vindEenJob}) {
        if (!vindEenJob.keyword && !vindEenJob.location) {
            speech.addMessage('je moet wel weten wat je wil');
            speech.send();
            return;
        }

        speech.addMessage(this.buildMessage({keyword: vindEenJob.keyword, location: vindEenJob.location, filters: vindEenJob.filters}));
        speech.send();
        this.promise.then((jobs) => {
            if (jobs.length !== 0) {
                speech.addElements(BackendService.mapToElements(jobs));
                speech.addDelay(3000);
                speech.addQuickReplies('Wil je deze resultaten nog filteren?',
                    [{
                        value: 'ik wil filteren',
                        label: 'ja, graag!'
                    }, {
                        value: 'bye',
                        label: 'nee, dank je'
                    }]);
                speech.send();
            } else {
                speech.addMessage('Sorry, ik kan geen resultaten voor deze criteria vinden...');
                speech.send();
            }
        });
    }

    completeGoal(goal, data) {
        goal.mainGoal = GoalFactory.newMainGoal('filter', data);
        goal.shorttermGoal = GoalFactory.newShortTermGoal('acceptNext', data);
    }

    buildMessage({keyword, location, filters}) {
        let result = 'ik zoek jobs';
        if (keyword) {
            result += ` voor ${keyword}`;
        }
        if (location) {
            result += ` in ${location}`;
        }
        if (filters && Object.keys(filters).length > 0) {
            result += ` gefilterd op ${this.filterService.toString(filters)}`;
        }
        return result;
    }

}
