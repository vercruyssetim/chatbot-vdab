export default class Scenario {

    constructor(sender, context, startState) {
        this.sender = sender;
        this.state = startState;
        this.context = context;
    }

    executeAction(action) {
        if (this[action.type]) {
            this[action.type](action.value);
        } else {
            this.sender.addMessage('ik heb geen flauw idee wat je bedoelt');
            this.sender.send();
        }
    }

    start() {
        this.state = this.state.start(this.sender, this.context);
    }

    negative() {
        this.state = this.state.negative(this.sender, this.context);
    }

    positive() {
        this.state = this.state.positive(this.sender, this.context);
    }

    saveLocation(location) {
        this.context.location = location;
        this.state = this.state.saveLocation(this.sender, this.context);
    }

    saveCompany(company) {
        this.context.keyword = company;
        this.state = this.state.saveKeyword(this.sender, this.context);
    }

    saveProfession(profession) {
        this.context.keyword = profession;
        this.state = this.state.saveKeyword(this.sender, this.context);
    }

    saveFilter(filter) {
        this.context.filter = filter;
        this.state = this.state.saveFilter(this.sender, this.context);
    }

    saveFilterOption(filterOption) {
        this.context.filters[this.context.filter] = filterOption;
        this.state = this.state.saveFilterOption(this.sender, this.context);
    }

    plain(text) {
        this.state = this.state.plain(this.sender, text);
    }
}
