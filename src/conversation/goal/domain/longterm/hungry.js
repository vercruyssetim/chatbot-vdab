export default class Hungry {

    constructor() {
        this.shorttermGoals = [];
        this.name = 'hungry';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    start(speech) {
        speech.addMessage('Dan moet je eten');
        speech.send();
    }

    complete() {
    }


}
