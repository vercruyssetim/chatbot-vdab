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
            if (filterGoal.value === 'type') {
                speech.addButtons('Ben je opzoek naar een vast of tijdelijke job?', this.filterService.getFilterOptions(filterGoal.value));
            } else if(filterGoal.value === 'voltijds_deeltijds') {
                speech.addButtons('Wil je voltijds of deeltijds werken?', this.filterService.getFilterOptions(filterGoal.value));
            } else if(filterGoal.value === 'diploma'){
                speech.addButtons('Welk diploma heb je?', this.filterService.getFilterOptions(filterGoal.value));
            }
            speech.send();
        } else {
            speech.addButtons('Waarop wil je filteren?', this.filterService.getFilters());
            speech.send();
        }
    }

    complete(speech, {filterGoal}) {
        if(filterGoal.completed){
            speech.addButtons('Dank je voor de extra info! Ik kan nu gerichter op zoek gaan.');
        }
    }

    failed(speech) {
        speech.addMessage('Gelieve één van de voorgestelde filters te kiezen');
        speech.send();
    }


}
