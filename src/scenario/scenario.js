export default class Scenario {

    constructor(sender, context, startState) {
        this.sender = sender;
        this.state = startState;
        this.context = context;
    }

    executeAction(action) {
        if (this.state && this.state[action.type] instanceof Function) {
            if (this[action.type]) {
                this[action.type](action.value);
            }
            this.state = this.state[action.type](this.sender, this.context);
        } else {
            this.sender.addMessage('Ik begrijp niet zo goed wat je bedoelt');
            this.sender.send();
        }
    }

    start() {
        this.state = this.state.start(this.sender, this.context);
    }

    saveLocation(location) {
        this.context.location = location;
    }

    saveKeyword(keyword) {
        this.context.keyword = keyword;
    }

    saveFilter(filter) {
        this.context.filter = filter;
    }

    saveFilterOption(filterOption) {
        this.context.filters[this.context.filter] = filterOption;
    }

    plain(plain) {
        this.context.plain = plain;
    }
}
