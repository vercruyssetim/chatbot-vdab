export default class ByeGoal {

    constructor() {
        this.shorttermGoals = [];
        this.name = 'bye';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech) {
        speech.addMessage('Ok, laat maar weten wanneer je me opnieuw nodig hebt :) ');
        speech.send();
    }

    complete() {
    }
}
