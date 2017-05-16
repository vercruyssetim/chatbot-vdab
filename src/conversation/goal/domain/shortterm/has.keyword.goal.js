import GoalFactory from '../../goal.factory';
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
            keywordGoal.unsure = true;
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

    completeGoal(goal, data){
        if(data.keywordGoal.unsure){
            goal.mainGoal.getShorttermGoals().push(GoalFactory.newShortTermGoal('diploma', data));
        }
    }

    start(speech) {
        speech.addMessage('Welke job zoek je?');
        speech.send();
    }

    complete(speech, {keywordGoal}){
        if(keywordGoal.unsure){
            speech.addMessage('Geen probleem, we komen er samen wel uit.');
            speech.send();
        }
    }

    failed(speech) {
        speech.addMessage('Sorry, ik begrijp niet goed wat je bedoelt. Ik leer nog elke dag bij.');
        speech.addMessage('Probeer het eens met een ander woord.');
        speech.send();
    }
}
