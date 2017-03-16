import HasLocationGoal from '../shortterm/has.location.goal';
import HasKeywordGoal from '../shortterm/has.keyword.goal';
import applicationConfig from '../../../../applicationConfig';
import BackendService from '../../../../backend/backend.service';
import FilterGoal from '../shortterm/has.filter.goal';

export default class VindEenJobGoal {

    constructor(data, {filter}) {
        this.shorttermGoals = [
            new HasLocationGoal(data),
            new HasKeywordGoal(data),
            new FilterGoal(data, filter)
        ];
        data.vindEenJob = {
            clearData: !filter
        };
        this.vindEenJobClient = applicationConfig.getVindEenJobClient();
        this.filterService = applicationConfig.getFilterService();
        this.name = 'VindEenJob';
    }

    startData(data, userAction) {
        if (this.clearData) {
            data.locationGoal = {};
            data.keywordGoal = {};
            data.filters = {};

            let {location, company, profession} = userAction.entities;
            if (location) {
                data.locationGoal.value = location;
            }

            if (company) {
                data.keywordGoal.value = company;
            }

            if (profession) {
                data.keywordGoal.value = profession;
            }
        }
    }

    completeData({locationGoal, keywordGoal, filters}) {
        this.promise = this.vindEenJobClient.lookupJobs({keyword: keywordGoal.value, location: locationGoal.value, filters, limit: '5'});
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech, {locationGoal, keywordGoal}) {
        if ((!locationGoal || !locationGoal.value) && (!keywordGoal || !keywordGoal.value)) {
            speech.addMessage('Laten we een job voor je zoeken');
            speech.send();
        }
    }

    complete(speech, {keywordGoal, locationGoal, filters}) {
        if (!keywordGoal.value && !locationGoal.value) {
            speech.addMessage('je moet wel weten wat je wil');
            speech.send();
            return;
        }

        speech.addMessage(this.buildMessage({keyword: keywordGoal.value, location: locationGoal.value, filters}));
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
