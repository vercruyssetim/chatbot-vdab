export default class HasKeywordGoal {

    constructor(){
        this.isCompleted = false;
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.company || userAction.entities.profession || userAction.intent === 'unsure';
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

    failed(speech){
        speech.addMessage('Sorry, Ik begrijp niet goed wat je bedoelt.');
        speech.addMessage('Bij wie of als wat wil je werken?');
        speech.send();
    }
}
