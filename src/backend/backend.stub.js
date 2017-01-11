const Answer = require('./answer');

class BackendStub {
    constructor() {
        this.answers = {};
        this.usernames = {};
    }

    $onInit() {

    }

    saveUsername(userId, username){
        if(!this.usernames[userId]){
            this.usernames[userId] = {};
        }
        this.usernames[userId] = username;
    }

    getUsername(userId){
        return this.usernames[userId];
    }

    saveParameter(userId, parameter) {
        let answer = Answer.fromParameter(parameter);
        if(!this.answers[userId]){
            this.answers[userId] = {};
        }
        if(!this.answers[userId][answer.getConversationType()]){
            this.answers[userId][answer.getConversationType()] = [];
        }
        this.answers[userId][answer.getConversationType()].push(answer);
    }

    answersToString(userId, conversationType){
        return this.answers[userId][conversationType].map((answer) =>
            `your ${answer.type} is ${answer.value}`
        )
    }
}
const backendStub = new BackendStub();
module.exports = backendStub;

