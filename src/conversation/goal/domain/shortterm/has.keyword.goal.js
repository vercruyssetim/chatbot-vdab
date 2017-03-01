export default class HasKeywordGoal {

    constructor(){
        this.isCompleted = false;
    }

    isCompletedByUserAction(userAction) {
        return userAction.intent === 'telling_profession' || userAction.intent === 'telling_company' || userAction.intent === 'unsure';
    }

    completeData(data, userAction) {
        if(userAction.intent === 'unsure') {
            this.isCompleted = true;
        } else if (userAction.entities.company) {
            data.keyword = userAction.entities.company;
        } else if (userAction.entities.profession) {
            data.keyword = userAction.entities.profession;
        } else {
            data.keyword = userAction.entities.text;
        }
    }

    isCompletedBy(data) {
        return this.isCompleted || (data.keyword !== null && data.keyword !== undefined);
    }


    start(speech) {
        speech.addMessage('Als wat of bij wie wil je werken?');
        speech.send();
    }

    complete() {

    }
}
