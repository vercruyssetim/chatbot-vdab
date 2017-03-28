import GoalFactory from '../../goal.factory';
import BladSteenSchaarChoiceGoal from '../shortterm/blad.steen.schaar.choice';
export default class BladSteenSchaarGoal {

    constructor(data) {
        this.shorttermGoals = [
            new BladSteenSchaarChoiceGoal(data)
        ];
        data.bladSteenSchaar = data.bladSteenSchaar ? data.bladSteenSchaar : {times: 0};
        this.name = 'bladSteenSchaar';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    completeGoal(goal, data) {
        goal.mainGoal = GoalFactory.newMainGoal('bladSteenSchaar', data);
        goal.shorttermGoal = GoalFactory.newShortTermGoal('acceptNext', data);
    }

    completeData({bladSteenSchaar}) {
        bladSteenSchaar.times = bladSteenSchaar.times + 1;
    }

    start(speech) {
        speech.addMessage('Super! Ik vind blad-steen-schaar geweldig!');
        speech.send();
    }

    complete(speech, {bladSteenSchaar}) {
        let answer;
        if (bladSteenSchaar.choice === 'schaar') {
            answer = 'steen';
        } else if (bladSteenSchaar.choice === 'steen') {
            answer = 'blad';
        } else {
            answer = 'schaar';
        }

        speech.addMessage(answer);
        speech.addDelay(2000);
        if (bladSteenSchaar.times === 2) {
            speech.addMessage('Dit is al de tweede keer dat ik win');
            speech.addMessage('Wel je best doen, hé');
        } else if (bladSteenSchaar.times === 4) {
            speech.addMessage('Vijf keer op rij gewonnen!');
            speech.addMessage('Je bent niet echt goed in dit spel...');
        } else if (bladSteenSchaar.times === 9) {
            speech.addMessage('Misschien kunnen we beter stoppen dit wordt een beetje genant');
        } else {
            speech.addMessage('Ik win!');
        }
        speech.addMessage('Spelen we nog een keer?');
        speech.send();
    }
}
