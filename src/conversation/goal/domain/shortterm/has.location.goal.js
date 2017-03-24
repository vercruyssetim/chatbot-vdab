export default class HasLocationGoal {

    constructor(data) {
        data.locationGoal = {
            completed: false
        };
        this.name = 'hasLocation';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.location || userAction.intent === 'unsure';
    }

    isCompletedBy({vindEenJob, locationGoal}) {
        return locationGoal.completed || vindEenJob.location;
    }

    completeData({vindEenJob, locationGoal}, userAction) {
        if (userAction.intent === 'unsure') {
            locationGoal.completed = true;
        } else {
            vindEenJob.location = userAction.entities.location;
        }
    }

    start(speech) {
        speech.addMessage('Waar in Vlaanderen zou je willen werken?');
        speech.send();
    }

    complete(speech, {vindEenJob}) {
        if (vindEenJob.location) {
            speech.addMessage(`Fijn dat je in ${vindEenJob.location} wil werken`);
        } else {
            speech.addMessage('We zullen overal in vlaanderen voor je zoeken');
        }
        speech.send();
    }

    failed(speech){
        speech.addMessage('Sorry, welke locatie bedoelde je precies?');
        speech.send();
    }
}