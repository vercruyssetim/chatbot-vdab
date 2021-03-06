import {UNSURE} from '../../../../backend/vind.een.job.client';
import applicationConfig from '../../../../applicationConfig';
export default class ConfirmInputGoal {

    constructor(data) {
        this.filterService = applicationConfig.getFilterService();
        data.confirmInput = {
            completed: false
        };
        if (!data.vindEenJob || (!data.vindEenJob.location && !data.vindEenJob.keyword)) {
            data.confirmInput.completed = true;
        }
        this.name = 'confirmInput';
    }

    start(speech, {vindEenJob}) {
        speech.addQuickReplies(this.buildMessage(vindEenJob), [{value: 'ja', label: 'ja'}, {value: 'nee', label: 'nee'}]);
        speech.send();
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.yes_no;
    }

    isCompletedBy({confirmInput}) {
        return confirmInput.completed;
    }

    completeData({vindEenJob, confirmInput}, userAction) {
        if (userAction.entities.yes_no === 'nee') {
            vindEenJob.location = null;
            vindEenJob.keyword = null;
            vindEenJob.filters = {};
        }
        confirmInput.completed = true;
    }

    complete() {

    }

    buildMessage({keyword, location, filters}) {
        let result = 'Uitvoeren ';
        if (keyword) {
            result += ` voor ${keyword}`;
        }
        if (location && location !== UNSURE) {
            result += ` in ${location}`;
        }
        if (filters && Object.keys(filters).length > 0) {
            result += ` gefilterd op ${this.filterService.toString(filters)}`;
        }
        result += '?';
        return result;
    }
}
