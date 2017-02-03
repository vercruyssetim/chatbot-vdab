import StartState from './start.state';

export default class VEJScenario {

    constructor(sender) {
        this.sender = sender;
        this.context = {};
        this.state = new StartState();
        this.handlers = {
            start: () => this.start(),
            negative: () => this.negative(this.context),
            positive: () => this.positive(this.context),
            saveLocation: (location) => this.saveLocation(location),
            saveProfession: (profession) => this.saveProfession(profession),
            saveCompany: (company) => this.saveCompany(company)
        };
    }

    executeAction(action) {
        if (this.handlers[action.type]) {
            this.state = this.handlers[action.type](action.value);
        } else {
            this.sender.addMessage('ik heb geen flauw idee wat je bedoelt');
            this.sender.send();
        }
    }

    start() {
        return this.state.start(this.sender);
    }

    negative() {
        return this.state.negative(this.sender);
    }

    positive() {
        return this.state.positive(this.sender);
    }

    saveLocation(location) {
        this.context.location = location;
        return this.state.saveLocation(this.sender, this.context);
    }

    saveCompany(company) {
        this.context.company = company;
        return this.state.saveCompany(this.sender, this.context);
    }

    saveProfession(profession) {
        this.context.profession = profession;
        return this.state.saveProfession(this.sender, this.context);
    }
}
