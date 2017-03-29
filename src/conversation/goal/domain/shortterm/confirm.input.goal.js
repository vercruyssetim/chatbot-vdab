export default class ConfirmInputGoal {

    constructor(data) {
        data.confirmInput = {
            completed: false
        };
        if (!data.vindEenJob || (!data.vindEenJob.location && !data.vindEenJob.keyword)) {
            data.confirmInput.completed = true;
        }
        this.name = 'confirmInput';
    }

    start(speech, {vindEenJob}) {
        speech.addMessage(this.buildMessage(vindEenJob));
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
        if (location) {
            result += ` in ${location}`;
        }
        if (filters && Object.keys(filters).length > 0) {
            result += ` gefilterd op ${this.filterService.toString(filters)}`;
        }
        result += '?';
        return result;
    }
}
