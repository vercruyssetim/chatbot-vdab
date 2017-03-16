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

    isCompletedBy({locationGoal}) {
        return locationGoal.completed || (locationGoal.value !== null && locationGoal.value !== undefined);
    }

    completeData({locationGoal}, userAction) {
        if (userAction.intent === 'unsure') {
            locationGoal.completed = true;
        } else {
            locationGoal.value = userAction.entities.location;
        }
    }

    start(speech) {
        speech.addMessage('Waar in Vlaanderen zou je willen werken?');
        speech.send();
    }

    complete(speech, {locationGoal}) {
        if (locationGoal.value) {
            speech.addMessage(`Fijn dat je in ${locationGoal.value} wil werken`);
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