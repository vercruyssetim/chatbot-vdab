export default class Question {
    constructor(index) {
        this.index = index;
        this.defaultNextQuestion = null;
        this.nextQuestion = {};
    }

    withNextQuestion(answer, nextQuestion) {
        this.nextQuestion[answer] = nextQuestion;
        return this;
    }

    withDefaultNextQuestion(defaultNextQuestion){
        this.defaultNextQuestion = defaultNextQuestion;
        return this;
    }

    saveAnswer(answer) {
        this.answer = answer;
    }

    getNextQuestion() {
        if (!this.answer || !this.nextQuestion[this.answer.value]) {
            if(this.defaultNextQuestion){
                return this.defaultNextQuestion;
            }
            return parseInt(this.index) + 1;
        }
        return this.nextQuestion[this.answer.value];
    }

    static aQuestion(index){
        return new Question(index);
    }
}
