export default class HasKeywordGoal {

    isCompletedByUserAction(userAction) {
        return userAction.intent === 'telling_profession' || userAction.intent === 'telling_company';
    }

    completeData(data, userAction) {
        if (userAction.entities.company) {
            data.keyword = userAction.entities.company;
        } else if (userAction.entities.profession) {
            data.keyword = userAction.entities.profession;
        } else {
            data.keyword = userAction.entities.text;
        }
    }

    isCompletedBy(data) {
        return data.keyword !== null && data.keyword !== undefined;
    }


    start(speech) {
        speech.addMessage('Als wat of bij wie wil je werken?');
        speech.send();
    }

    complete() {

    }
}
