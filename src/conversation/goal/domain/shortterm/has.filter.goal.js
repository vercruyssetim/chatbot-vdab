import applicationConfig from '../../../../applicationConfig';

export default class FilterGoal {

    constructor(data, filter) {
        this.filterService = applicationConfig.getFilterService();
        data.filterGoal = {
            required: filter,
            completed: false
        };
        this.name = 'hasFilter';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.filter || userAction.entities.filterOption;
    }

    isCompletedBy({filterGoal}) {
        return !filterGoal.required || filterGoal.completed;
    }

    completeData({filterGoal, vindEenJob}, userAction) {
        if (filterGoal.value) {
            vindEenJob.filters[filterGoal.value] = userAction.entities.filterOption;
            filterGoal.value = null;
            filterGoal.completed = true;
        } else {
            filterGoal.value = userAction.entities.filter;
        }
    }

    start(speech, {filterGoal}) {
        if (filterGoal.value) {
            speech.addButtons(`Kies een optie voor ${this.filterService.getLabel(filterGoal.value)}`, this.filterService.getFilterOptions(filterGoal.value));
            speech.send();
        } else {
            speech.addButtons('Waarop wil je filteren?', this.filterService.getFilters());
            speech.send();
        }
    }

    complete() {

    }

    failed(speech){
        speech.addMessage('Gelieve één van de voorgestelde filters te kiezen');
        speech.send();
    }


}
