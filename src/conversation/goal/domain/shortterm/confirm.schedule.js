export default class ConfirmSchedule {

    constructor(data) {
        data.confirmSchedule = {
            completed: false
        };
        this.name = 'confirmSchedule';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.yes_no;
    }

    isCompletedBy({confirmSchedule}) {
        return confirmSchedule.completed;
    }

    start(speech) {
        speech.addQuickReplies('Wil je dat ik elke dag nieuwe jobs voor je zoek?', [{value: 'Ja', label: 'ja'}, {value: 'Nee', label: 'nee'}]);
        speech.send();
    }

    completeData({confirmSchedule}, userAction) {
        confirmSchedule.answer = userAction.entities.yes_no;
        confirmSchedule.completed = true;
    }

    completeGoal(goal, {confirmSchedule}) {
        if (confirmSchedule.answer === 'nee') {
            goal.shorttermGoal = null;
            goal.mainGoal = null;
        }
    }

    complete(speech, {confirmSchedule}) {
        if (confirmSchedule.answer === 'nee') {
            speech.addMessage('Geen probleem. Heb je toch nog hulp nodig, dan weet je me te vinden. Voor eeuwig jouw Harry');
        }
        speech.send();
    }
}
