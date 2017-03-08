export default class HasLocationGoal {

    constructor() {
        this.isCompleted = false;
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.location || userAction.intent === 'unsure';
    }

    isCompletedBy(data) {
        return this.isCompleted || (data.location !== null && data.location !== undefined);
    }

    completeData(data, userAction) {
        if (userAction.intent === 'unsure') {
            this.isCompleted = true;
        } else {
            data.location = userAction.entities.location;
        }
    }

    start(speech) {
        speech.addMessage('Waar in Vlaanderen zou je willen werken?');
        speech.send();
    }

    complete(speech, data) {
        if (data.location) {
            speech.addMessage(`Fijn dat je in ${data.location} wil werken`);
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