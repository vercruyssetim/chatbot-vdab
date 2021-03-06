export default class WitMapper {

    static extractEntities(data) {
        let intent, yes_no, location, profession, company, filter, filterOption, bladSteenSchaar, hasInitiative;
        if (data.entities) {
            intent = WitMapper.firstEntityValue(data.entities, 'intent');
            yes_no = WitMapper.firstEntityValue(data.entities, 'yes_no');
            location = WitMapper.firstEntityValue(data.entities, 'location');
            profession = WitMapper.firstEntityValue(data.entities, 'profession');
            company = WitMapper.firstEntityValue(data.entities, 'company');
            filter = WitMapper.firstEntityValue(data.entities, 'filter');
            filterOption = WitMapper.firstEntityValue(data.entities, 'filter_option');
            bladSteenSchaar = WitMapper.firstEntityValue(data.entities, 'bladSteenSchaar');
            //TODO: add plain
        }
        if (
            [
                'blad_steen_schaar',
                'bye',
                'filter_results',
                'hungry',
                'start_vej',
                'start_schedule',
                'stop_schedule',
                'welcome'
            ].includes(intent)) {
            hasInitiative = true;
        }
        return {
            intent,
            entities: {yes_no, location, profession, company, filter, filterOption, bladSteenSchaar},
            hasInitiative
        };
    }

    static firstEntityValue(entities, entity) {
        const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].confidence > 0.5 &&
            entities[entity][0].value;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }

}
