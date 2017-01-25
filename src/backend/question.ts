import {Answer} from "./answer";
export class Question {
    private index: string;
    private defaultNextQuestion: number = null;
    private nextQuestion: {[answer: string]: number} = {};
    private answer: Answer;

    constructor(index) {
        this.index = index;
    }

    withNextQuestion(answer: string, nextQuestion: number) {
        this.nextQuestion[answer] = nextQuestion;
        return this;
    }

    withDefaultNextQuestion(defaultNextQuestion: number) {
        this.defaultNextQuestion = defaultNextQuestion;
        return this;
    }

    saveAnswer(answer) {
        this.answer = answer;
    }

    getNextQuestion() {
        if (!this.answer || !this.nextQuestion[this.answer.getValue()]) {
            if (this.defaultNextQuestion) {
                return this.defaultNextQuestion;
            }
            return parseInt(this.index) + 1;
        }
        return this.nextQuestion[this.answer.getValue()];
    }

    static aQuestion(index) {
        return new Question(index);
    }
}
