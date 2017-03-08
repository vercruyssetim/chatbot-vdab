import applicationConfig from '../../../../applicationConfig';

export default class FilterGoal {

    constructor(filter) {
        this.required = filter;
        this.completed = false;
        this.filterService = applicationConfig.getFilterService();
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.filter || userAction.entities.filterOption;
    }

    isCompletedBy() {
        return !this.required || this.completed;
    }

    completeData(data, userAction) {
        if (data.filter) {
            data.filters[data.filter] = userAction.entities.filterOption;
            data.filter = null;
            this.completed = true;
        } else {
            data.filter = userAction.entities.filter;
        }
    }

    start(speech, data) {
        if (data.filter) {
            speech.addButtons(`Kies een optie voor ${this.filterService.getLabel(data.filter)}`, this.filterService.getFilterOptions(data.filter));
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
