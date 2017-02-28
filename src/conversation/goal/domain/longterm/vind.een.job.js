import HasLocationGoal from '../shortterm/has.location.goal';
import HasKeywordGoal from '../shortterm/has.keyword.goal';
import applicationConfig from '../../../../applicationConfig';
import BackendService from '../../../../backend/backend.service';

export default class VindEenJobGoal {

    constructor() {
        this.shorttermGoals = [
            new HasLocationGoal(),
            new HasKeywordGoal()
        ];
        this.vindEenJobClient = applicationConfig.getVindEenJobClient();
        this.filterService = applicationConfig.getFilterService();
    }

    startData(data, userAction) {
        let {location, keyword} = userAction.entities;
        if (location) {
            data.location = location;
        }
        if (keyword) {
            data.keyword = keyword;
        }
    }

    completeData({location, keyword, filters}) {
        this.promise = this.vindEenJobClient.lookupJobs({keyword, location, filters, limit: '5'}).then((jobs) => {
            this.jobs = jobs;
        });
        console.log(`completeData ${JSON.stringify(this.promise)}`);
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech) {
        speech.addMessage('Laten we een job voor je zoeken');
        speech.send();
    }

    complete(speech, {keyword, location, filters}) {
        speech.addMessage(this.buildMessage({keyword, location, filters}));
        speech.send();
        console.log(`complete ${JSON.stringify(this.promise)}`);
        this.promise.then(() => {
            if (this.jobs.length !== 0) {
                speech.addElements(BackendService.mapToElements(this.jobs));
                speech.addDelay(3000);
                speech.addQuickReplies('Wil je deze resultaten nog filteren?', ['ja, graag!', 'nee, dank je']);
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
        if (filters) {
            result += ` gefilterd op ${filters}`;
        }
        return result;
    }

}
