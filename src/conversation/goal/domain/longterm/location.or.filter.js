import GoalFactory from '../../goal.factory';
export default class LocationOrFilter {

    constructor(data) {
        this.shorttermGoals = [];
        data.locationOrFilter = {};
        this.name = 'locationOrFilter';
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    completeData({jaNee, locationOrFilter, vindEenJob}) {
        if (jaNee.answer === 'ja') {
            locationOrFilter.answer = 'location';
            vindEenJob.location = null;
        } else {
            locationOrFilter.answer = 'filter';
        }
    }

    completeGoal(goal, data) {
        if (data.locationOrFilter.answer === 'location') {
            goal.mainGoal = GoalFactory.newMainGoal('VindEenJobOpnieuw', data);
            goal.shorttermGoal = GoalFactory.newShortTermGoal('hasLocation', data);
        } else {
            goal.mainGoal = GoalFactory.newMainGoal('filter', data);
            goal.shorttermGoal = GoalFactory.newShortTermGoal('acceptNext', data);
        }
    }

    complete(speech, {locationOrFilter}) {
        if (locationOrFilter.answer === 'location') {
            speech.addMessage('In welke gemeente of stad wil je werken?');
        } else {
            speech.addQuickReplies('Wil je je zoekresultaat verfijnen?', [{value: 'Ja', label: 'ja'}, {value: 'Nee', label: 'nee'}]);
        }
        speech.send();
    }
}
