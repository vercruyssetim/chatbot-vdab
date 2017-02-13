export default class EndState {

    constructor(nextState){
        this.nextState = nextState;
        this.isEndState = true;
    }

    negative(reply){
        reply.addMessage('Ok, laat me maar weten indien je iets anders wil weten');
        reply.send();
        return this;
    }

    positive(reply){
        return this.nextState.start(reply);
    }
}
