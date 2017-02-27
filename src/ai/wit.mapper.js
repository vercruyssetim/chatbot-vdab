export default class WitMapper {

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
            intent = WitMapper.firstEntityValue(data.entities, 'intent');
            yes_no = WitMapper.firstEntityValue(data.entities, 'yes_no');
            location = WitMapper.firstEntityValue(data.entities, 'location');
            profession = WitMapper.firstEntityValue(data.entities, 'profession');
            company = WitMapper.firstEntityValue(data.entities, 'company');
            filter = WitMapper.firstEntityValue(data.entities, 'filter');
            filterOption = WitMapper.firstEntityValue(data.entities, 'filter_option');
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
