export default class ApiMapper {

    static extractEntities(data) {
        let intent, yes_no, location, profession, company, filter, filterOption, hasInitiative;
        intent = data.result.action;
        if (data.result.action === 'yes' || data.result.action === 'no') {
            yes_no = data.result.action;
        }
        location = data.result.parameters.location;
        profession = data.result.parameters.profession;
        company = data.result.parameters.company;
        filter = data.result.parameters.filter;
        filterOption = data.result.parameters.filterOption;
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
            ]
                .includes(intent)) {
            hasInitiative = true;
        }
        return {intent, entities: {yes_no, location, profession, company, filter, filterOption}, hasInitiative};
    }


}
