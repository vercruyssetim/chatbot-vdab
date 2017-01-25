import {Answer} from "./answer";
import {Question} from "./question";

export class BackendStub {
    private answers: {[userid: string] : {[conversationType: string]: Array<Answer>}};
    private usernames: {[userid: string]: string};
    private currentQuestion: Question;
    private questions: {[conversationType: string]: {[index: number]: Question}};

    constructor() {
        this.questions = {
            orientation: {
                1: Question.aQuestion(1).withNextQuestion('boxing', 3).withNextQuestion('drinking', 4),
                2: Question.aQuestion(2),
                3: Question.aQuestion(3),
                4: Question.aQuestion(4).withDefaultNextQuestion(3)
            }
        };
    }

    getStartQuestionIndex(conversationType) {
        this.currentQuestion[conversationType] = this.questions[conversationType][1];
        return this.currentQuestion[conversationType].index;
    }

    getNextQuestion(conversationType) {
        let currentQuestion = this.currentQuestion[conversationType];
        let nextQuestion = currentQuestion.getNextQuestion();
        this.currentQuestion[conversationType] = this.questions[conversationType][nextQuestion];
        return this.currentQuestion[conversationType].index;
    }

    saveUsername(userId: string, username: string) {
        if (!this.usernames[userId]) {
            this.usernames[userId] = '';
        }
        this.usernames[userId] = username;
    }

    getUsername(userId) {
        return this.usernames[userId];
    }

    saveParameter(userId, parameter) {
        let answer = Answer.fromParameter(parameter);
        if (!this.answers[userId]) {
            this.answers[userId] = {};
        }
        if (!this.answers[userId][answer.getConversationType()]) {
            this.answers[userId][answer.getConversationType()] = [];
        }
        this.answers[userId][answer.getConversationType()].push(answer);
        this.currentQuestion[answer.getConversationType()].saveAnswer(answer);
    }

    answersToString(userId, conversationType) {
        if (!this.answers[userId] || !this.answers[userId][conversationType]) {
            return null;
        }
        return this.answers[userId][conversationType].map((answer) =>
            `your ${answer.getType()} is ${answer.getValue()}`
        );
    }

    clearData() {
        this.currentQuestion = null;
        this.usernames = {};
        this.answers = {};
    }
}

