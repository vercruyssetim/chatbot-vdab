import VEJScenario from '../vejScenario/scenario';

export default class ConversationService {

    constructor(senderService) {
        this.senderService = senderService;
    }


    getResponse(data, sessionId) {
        const entities = ConversationService.extractEntities(data);
        const action = ConversationService.extractAction(entities, data._text);

        console.log(`entities ${JSON.stringify(entities)}`);
        console.log(`action ${JSON.stringify(action)}`);
        if (entities.intent === 'welcome') {
            this.scenario = new VEJScenario({
                addMessage: (message) => this.senderService.addMessage(sessionId, message),
                addQuickReplies: (message, quickreplies) => this.senderService.addQuickReplies(sessionId, message, quickreplies),
                addElements: (elements) => this.senderService.addElements(sessionId, elements),
                send: () => this.senderService.send(sessionId)
            });
        }
        this.scenario.executeAction(action);
    }

    static extractAction({intent, yes_no, location, profession, company}, text) {
        if (intent === 'welcome') {
            return {
                type: 'start'
            };
        }

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

        return {
            type: 'plain',
            value: text
        };
    }

    static extractEntities(data) {
        let intent, yes_no, location, profession, company;
        if (data.entities) {
            intent = ConversationService.firstEntityValue(data.entities, 'intent');
            yes_no = ConversationService.firstEntityValue(data.entities, 'yes_no');
            location = ConversationService.firstEntityValue(data.entities, 'location');
            profession = ConversationService.firstEntityValue(data.entities, 'profession');
            company = ConversationService.firstEntityValue(data.entities, 'company');
        }
        return {intent, yes_no, location, profession, company};
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
