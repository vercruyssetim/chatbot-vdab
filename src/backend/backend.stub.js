const Answer = require('./answer');

class BackendStub {
    constructor() {
        this.answers = {};
    }

    $onInit() {

    }

    saveParameter(parameter) {
        let answer = Answer.fromParameter(parameter);
        if(!this.answers[answer.getConversationType()]){
            this.answers[answer.getConversationType()] = [];
        }
        this.answers[answer.getConversationType()].push(answer);
    }

    answersToString(conversationType){
        return this.answers[conversationType].map((answer) =>
            `your ${answer.type} is ${answer.value}`
        )
    }
}
const backendStub = new BackendStub();
module.exports = backendStub;

