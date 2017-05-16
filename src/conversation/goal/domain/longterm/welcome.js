import GoalFactory from '../../goal.factory';
import JaNeeGoal from '../shortterm/ja.nee.goal';
export default class WelcomeGoal {

    constructor(data) {
        this.shorttermGoals = [];
        data.welcome = data.welcome ? data.welcome : {time: 0};
        if (data.welcome.time) {
            this.shorttermGoals.push(new JaNeeGoal(data));
        }
        this.name = 'Welcome';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech, {welcome, user}) {
        if (welcome.time !== 0) {
            speech.addMessage(`Dag ${user.fullName}`);
            speech.addQuickReplies('Volgens mij hebben wij elkaar al eens ontmoet?', [{label: 'Ja', value: 'ja'}, {label: 'Nee', value: 'nee'}]);
            speech.send();
        }
    }

    completeData({welcome}) {
        welcome.time = welcome.time + 1;
    }

    completeGoal(goal, data) {
        goal.mainGoal = GoalFactory.newMainGoal('VindEenJob', data);
        goal.shorttermGoal = GoalFactory.newShortTermGoal('acceptNext', data);
    }

    complete(speech, {user, welcome, jaNee}) {
        if (welcome.time !== 1) {
            if (jaNee.answer === 'ja') {
                speech.addMessage('Ha! Mijn geheugen laat me niet in de steek.');
            } else {
                speech.addMessage('Oeps... vergeet wat ik zei.');
                speech.addMessage('Welkom! Ik ben Harry, de vacaturebot van VDAB. Ik wil je helpen om een job te vinden.');
            }
            speech.addQuickReplies('Zullen we beginnen?', [{label: 'Ja', value: 'Natuurlijk'}]);
            speech.send();
        } else {
            speech.addMessage(`Dag ${user.fullName}, ik ben Harry, de vacaturebot van VDAB. Ik wil je helpen om een job te vinden.`);
            speech.addMessage('Ik ben vrij nieuw, dus de kans bestaat dat ik nog fouten maak. Maar ik leer snel bij. ;-)');
            speech.addQuickReplies('Zullen we beginnen?', [{label: 'Ja, graag!', value: 'Natuurlijk'}]);
            speech.send();
        }
    }
}
