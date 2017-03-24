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

    completeData({vindEenJob, keywordGoal}, userAction) {
        if (userAction.intent === 'unsure') {
            keywordGoal.completed = true;
        } else if (userAction.entities.company) {
            vindEenJob.keyword = userAction.entities.company;
        } else if (userAction.entities.profession) {
            vindEenJob.keyword = userAction.entities.profession;
        } else {
            vindEenJob.keyword = userAction.entities.text;
        }
    }

    isCompletedBy({vindEenJob, keywordGoal}) {
        return keywordGoal.completed || vindEenJob.keyword;
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
