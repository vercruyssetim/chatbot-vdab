import Scenario from '../scenario/scenario';
import VEJStartState from '../scenario/vej/vej.start.state';
import OverviewStartState from '../scenario/overview/overview.start.state';
import FilterStartState from '../scenario/filter.results/filter.start.state';
import ScheduleStartState from '../scenario/schedule/schedule.start.state';

export default class ConversationService {

    constructor(senderService, userService) {
        this.senderService = senderService;
        this.userService = userService;
        this.contexts = {};
        this.scenarios = {};
    }


    getResponse(data, sessionId) {
        const entities = ConversationService.extractEntities(data);
        const action = ConversationService.extractAction(entities, data._text);

        let sender = {
            addMessage: (message) => this.senderService.addMessage(sessionId, message),
            addQuickReplies: (message, quickreplies) => this.senderService.addQuickReplies(sessionId, message, quickreplies),
            addElements: (elements) => this.senderService.addElements(sessionId, elements),
            addButtons: (message, buttons) => this.senderService.addButtons(sessionId, message, buttons),
            addDelay: (stub) => this.senderService.addDelay(sessionId, stub),
            addImage: (image) => this.senderService.addImage(sessionId, image),
            send: () => this.senderService.send(sessionId)
        };

        // console.log(`data ${JSON.stringify(data)}`);
        // console.log(`entities ${JSON.stringify(entities)}`);
        // console.log(`action ${JSON.stringify(action)}`);


        if (entities.intent === 'welcome') {
            this.scenarios[sessionId] = new Scenario(sender, this.getContext(sessionId), new OverviewStartState());
            this.scenarios[sessionId].start();
        } else if (entities.intent === 'start_vej') {
            this.scenarios[sessionId] = new Scenario(sender, this.getContext(sessionId), new VEJStartState());
            this.scenarios[sessionId].start();
        } else if (entities.intent === 'filter_results') {
            this.scenarios[sessionId] = new Scenario(sender, this.getContext(sessionId), new FilterStartState());
            this.scenarios[sessionId].start();
        } else if (entities.intent === 'start_schedule') {
            this.scenarios[sessionId] = new Scenario(sender, this.getContext(sessionId), new ScheduleStartState());
            this.scenarios[sessionId].start();
        } else if (entities.intent === 'stop_schedule') {
            this.scenarios[sessionId] = new Scenario(sender, this.getContext(sessionId), new ScheduleStartState());
            this.scenarios[sessionId].start();
        } else {
            this.scenarios[sessionId].executeAction(action);
        }

        // console.log(`context ${JSON.stringify(this.getContext(sessionId))}`);
    }

    getContext(sessionId) {
        if (!this.contexts[sessionId]) {
            this.contexts[sessionId] = {
                sessionId,
                filters: {},
                user: this.userService.getUser(sessionId)
            };
        }
        return this.contexts[sessionId];
    }

    static extractAction({intent, yes_no, location, profession, company, filter, filterOption}, text) {

        if (yes_no === 'ja') {
            return {
                type: 'positive'
            };
        }

        if (yes_no === 'nee') {
            return {
                type: 'negative'
            };
        }

        if (intent === 'telling_location' && location) {
            return {
                type: 'saveLocation',
                value: location
            };
        }

        if (intent === 'telling_profession' && profession) {
            return {
                type: 'saveProfession',
                value: profession
            };
        }

        if (intent === 'telling_company' && company) {
            return {
                type: 'saveCompany',
                value: company
            };
        }

        if (filter) {
            return {
                type: 'saveFilter',
                value: filter
            };
        }

        if (filterOption) {
            return {
                type: 'saveFilterOption',
                value: filterOption
            };
        }

        return {
            type: 'plain',
            value: text
        };
    }

    static extractEntities(data) {
        let intent, yes_no, location, profession, company, filter, filterOption;
        if (data.entities) {
            intent = ConversationService.firstEntityValue(data.entities, 'intent');
            yes_no = ConversationService.firstEntityValue(data.entities, 'yes_no');
            location = ConversationService.firstEntityValue(data.entities, 'location');
            profession = ConversationService.firstEntityValue(data.entities, 'profession');
            company = ConversationService.firstEntityValue(data.entities, 'company');
            filter = ConversationService.firstEntityValue(data.entities, 'filter');
            filterOption = ConversationService.firstEntityValue(data.entities, 'filter_option');
        }
        return {intent, yes_no, location, profession, company, filter, filterOption};
    }

    static firstEntityValue(entities, entity) {
        const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }
}
