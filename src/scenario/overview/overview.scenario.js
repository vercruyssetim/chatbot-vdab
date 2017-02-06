import StartState from './start.state';

export default class OverviewScenario {

    constructor(sender) {
        this.sender = sender;
        this.state = new StartState();
    }

    executeAction() {
        this.sender.addMessage('Ik heb geen flauw idee wat je bedoelt');
        this.sender.send();
    }

    start() {
        this.state = this.state.start(this.sender);
    }
}

