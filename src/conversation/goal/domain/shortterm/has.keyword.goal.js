export default class HasKeywordGoal {

    constructor(data) {
        data.keywordGoal = {
            completed: false
        };
        this.name = 'hasKeyword';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.company || userAction.entities.profession || userAction.intent === 'unsure';
    }

    completeData({keywordGoal}, userAction) {
        if (userAction.intent === 'unsure') {
            keywordGoal.completed = true;
        } else if (userAction.entities.company) {
            keywordGoal.value = userAction.entities.company;
        } else if (userAction.entities.profession) {
            keywordGoal.value = userAction.entities.profession;
        } else {
            keywordGoal.value = userAction.entities.text;
        }
    }

    isCompletedBy({keywordGoal}) {
        return keywordGoal.completed || (keywordGoal.value !== null && keywordGoal.value !== undefined);
    }


    start(speech) {
        speech.addMessage('Als wat of bij wie wil je werken?');
        speech.send();
    }

    complete() {

    }

    failed(speech) {
        speech.addMessage('Sorry, Ik begrijp niet goed wat je bedoelt.');
        speech.addMessage('Bij wie of als wat wil je werken?');
        speech.send();
    }
}
