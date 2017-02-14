export default class ConversationService {

    constructor() {
    }


    getResponse(data, sessionId) {
        const entities = ConversationService.extractEntities(data);
        const userAction = ConversationService.extractUserAction(entities, data._text);
        let context = this.getContext(sessionId);

        let goal = this.goalEngine.getNextGoal(context, userAction);
        this.workExecutor.executeWork(context, goal);
        this.speecher.talk(context, goal);

        // console.log(`data ${JSON.stringify(data)}`);
        // console.log(`entities ${JSON.stringify(entities)}`);
        // console.log(`action ${JSON.stringify(action)}`);

    }

    getContext(sessionId) {
        if (!this.contexts[sessionId]) {
            this.contexts[sessionId] = {
                data: {
                    sessionId,
                    filters: {},
                    user: this.userService.getUser(sessionId)
                },
                goal: {}
            };
        }
        return this.contexts[sessionId];
    }

    static extractUserAction({intent, yes_no, location, profession, company, filter, filterOption}, text) {

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

        if (intent === 'telling_location') {
            return {
                type: intent,
                value: location
            };
        }

        if (intent === 'telling_profession') {
            return {
                type: intent,
                value: profession
            };
        }

        if (intent === 'telling_company') {
            return {
                type: intent,
                value: company
            };
        }

        if (intent) {
            return {
                type: intent,
                hasInitiative: true
            };
        } else {
            if (!intent) {
                if (filter) {
                    return {
                        type: 'telling_filter',
                        value: filter
                    };
                }

                if (filterOption) {
                    return {
                        type: 'telling_filter_option',
                        value: filterOption
                    };
                }

                if (location) {
                    return {
                        type: 'telling_location',
                        value: location
                    };
                }

                if (profession) {
                    return {
                        type: 'telling_profession',
                        value: profession
                    };
                }

                if (company) {
                    return {
                        type: 'telling_company',
                        value: company
                    };
                }

                return {
                    type: 'plain',
                    value: text
                };
            }
        }
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
