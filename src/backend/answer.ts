export class Answer {
    private conversationType:  string;
    private type: string;
    private value: string;

    constructor(conversationType, type, value) {
        this.conversationType = conversationType;
        this.type = type;
        this.value = value;
    }

    getConversationType() {
        return this.conversationType;
    }

    getValue(){
        return this.value;
    }

    getType(){
        return this.type;
    }

    static fromParameter(parameter) {
        let fieldName = Object.keys(parameter)[0];
        return new Answer(fieldName.split('_')[0], fieldName.split('_')[1], parameter[fieldName]);
    }
}
