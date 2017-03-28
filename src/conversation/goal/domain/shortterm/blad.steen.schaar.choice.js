export default class BladSteenSchaarChoiceGoal {
    constructor(data) {
        data.bladSteenSchaarChoice = {
            completed: false
        };
        this.name = 'bladSteenSchaarChoice';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.bladSteenSchaar;
    }

    isCompletedBy({bladSteenSchaarChoice}) {
        return bladSteenSchaarChoice.completed;
    }

    start(speech) {
        speech.addButtons('Maak je keuze', {blad: 'blad', steen: 'steen', schaar: 'schaar'});
        speech.send();
    }

    completeData({bladSteenSchaarChoice, bladSteenSchaar}, userAction) {
        bladSteenSchaar.choice = userAction.entities.bladSteenSchaar;
        bladSteenSchaarChoice.completed = true;
    }

    complete() {

    }

    failed(speech) {
        speech.addMessage('Wel één van de drie kiezen, jij valsspeler');
        speech.send();
    }
}
