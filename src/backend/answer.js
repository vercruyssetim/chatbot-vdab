export default class Answer {
    constructor(conversationType, type, value) {
        this.conversationType = conversationType;
        this.type = type;
        this.value = value;
    }

    getConversationType() {
        return this.conversationType;
    }

    static fromParameter(parameter) {
        let fieldName = Object.keys(parameter)[0];
        return new Answer(fieldName.split('_')[0], fieldName.split('_')[1], parameter[fieldName]);
    }
}
