import StartState from './start.state';

export default class VEJScenario {

    constructor(sender) {
        this.sender = sender;
        this.context = {
            filters: {}
        };
        this.state = new StartState();
        this.handlers = {
            negative: () => this.negative(),
            positive: () => this.positive(),
            saveLocation: (location) => this.saveLocation(location),
            saveProfession: (profession) => this.saveProfession(profession),
            saveCompany: (company) => this.saveCompany(company),
            saveFilter: (filter) => this.saveFilter(filter),
            saveFilterOption: (filterOption) => this.saveFilterOption(filterOption),
        };
    }

    executeAction(action) {
        if (this.handlers[action.type]) {
            this.handlers[action.type](action.value);
        } else {
            this.sender.addMessage('ik heb geen flauw idee wat je bedoelt');
            this.sender.send();
        }
    }

    start() {
        this.state = this.state.start(this.sender);
    }

    negative() {
        this.state = this.state.negative(this.sender);
    }

    positive() {
        this.state = this.state.positive(this.sender);
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
