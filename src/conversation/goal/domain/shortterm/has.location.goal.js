export default class HasLocationGoal {

    isCompletedByUserAction(userAction) {
        return userAction.intent === 'telling_location' && userAction.entities.location;
    }

    isCompletedBy(data) {
        return data.location !== null && data.location !== undefined;
    }

    completeData(data, userAction) {
        data.location = userAction.entities.location;
    }

    start(speech) {
        speech.addMessage('Waar in Vlaanderen zou je willen werken?');
        speech.send();
    }

    complete(speech, data){
        speech.addMessage(`Fijn dat je in ${data.location} wil werken`);
        speech.send();
    }
}