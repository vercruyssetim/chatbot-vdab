export default class AcceptNextGoal {

    constructor(data) {
        data.accept = {
            completed: false
        };
        this.name = 'acceptNext';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.yes_no;
    }

    isCompletedBy({accept}) {
        return accept.completed;
    }

    completeData({accept}, userAction) {
        accept.answer = userAction.entities.yes_no;
        accept.completed = true;
    }

    completeGoal(goal, {accept}) {
        if (accept.answer === 'nee') {
            goal.mainGoal = null;
            goal.shorttermGoal = null;
        }
    }

    complete(speech, {accept}) {
        if (accept.answer === 'ja') {
            speech.addMessage('Super');
        } else {
            speech.addMessage('Ok, geen erg');
        }
        speech.send();
    }
}