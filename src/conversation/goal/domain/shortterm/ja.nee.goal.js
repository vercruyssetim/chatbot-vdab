export default class JaNeeGoal {

    constructor(data) {
        data.jaNee = {
            completed: false
        };
        this.name = 'jaNee';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.yes_no;
    }

    isCompletedBy({jaNee}) {
        return jaNee.completed;
    }

    completeData({jaNee}, userAction) {
        jaNee.answer = userAction.entities.yes_no;
        jaNee.completed = true;
    }
}

