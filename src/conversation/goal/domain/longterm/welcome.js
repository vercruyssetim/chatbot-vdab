import GoalFactory from '../../goal.factory';
export default class WelcomeGoal {

    constructor(data) {
        this.shorttermGoals = [];
        data.welcome = data.welcome ? data.welcome : {time: 0};
        this.name = 'Welcome';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech, data) {
        speech.addMessage(`Goeiedag ${data.user.fullName}!`);
        speech.send();
    }

    completeData({welcome}) {
        welcome.time = welcome.time + 1;
    }

    completeGoal(goal, data) {
        goal.mainGoal = GoalFactory.newMainGoal('VindEenJob', data);
        goal.shorttermGoal = GoalFactory.newShortTermGoal('acceptNext', data);
    }

    complete(speech, {welcome}) {
        console.log(JSON.stringify(welcome));
        if(welcome.time === 1){
            speech.addMessage('Ik ben een chat bot van de VDAB en ik kan je helpen met het vinden van een vacature');
            speech.addMessage('Ik ben nog vrij nieuw dus de kans bestaat dat ik nog fouten maak.');
            speech.addQuickReplies('Zullen we beginnen?', [{label: 'Natuurlijk!', value: 'Natuurlijk'}]);
            speech.send();
        } else {
            speech.addMessage('Welkom terug');
            speech.addMessage('Nog steeds opzoek naar een job?');
            speech.addQuickReplies('Zullen we beginnen?', [{label: 'Ja, graag', value: 'Ja, graag'}]);
            speech.send();
        }
    }
}
