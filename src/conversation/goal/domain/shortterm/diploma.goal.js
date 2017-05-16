import applicationConfig from '../../../../applicationConfig';

export default class DiplomaGoal {

    constructor(data) {
        this.filterService = applicationConfig.getFilterService();
        data.diplomaGoal = {
            completed: false
        };
        this.name = 'diploma';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.filterOption;
    }

    isCompletedBy({diplomaGoal}) {
        return diplomaGoal.completed;
    }

    completeData({diplomaGoal, vindEenJob}, userAction) {
        console.log(JSON.stringify(diplomaGoal));
        console.log(JSON.stringify(vindEenJob));
        vindEenJob.filters['diploma'] = userAction.entities.filterOption;
        diplomaGoal.completed = true;
    }

    start(speech) {
        speech.addButtons('Welk diploma heb je?', this.filterService.getFilterOptions('diploma'));
        speech.send();
    }

    failed(speech) {
        speech.addMessage('Gelieve één van de voorgestelde opties te kiezen');
        speech.send();
    }

}
