import GoalFactory from '../../goal.factory';
export default class WelcomeGoal {

    constructor() {
        this.shorttermGoals = [];
        this.name = 'Welcome';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech, data) {
        speech.addMessage(`Goeiedag ${data.user.fullName}!`);
        speech.send();
    }

    completeGoal(goal, data) {
        goal.mainGoal = GoalFactory.newMainGoal('VindEenJob', data);
        goal.shorttermGoal = GoalFactory.newShortTermGoal('acceptNext', data);
    }

    complete(speech) {
        speech.addMessage('Ik ben een chat bot van de VDAB en ik kan je helpen met het vinden van een vacature');
        speech.addMessage('Ik ben nog vrij nieuw dus de kans bestaat dat ik nog fouten maak.');
        speech.addQuickReplies('Zullen we beginnen?', [{label: 'Natuurlijk!', value: 'ik zoek een job'}]);
        speech.send();
    }
}
