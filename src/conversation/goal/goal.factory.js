import WelcomeGoal from './domain/longterm/welcome';
import MainGoal from './main.goal';
import VindEenJobGoal from './domain/longterm/vind.een.job';
export default class GoalFactory {

    static getNewMainGoal(userAction) {
        return new MainGoal(GoalFactory.getMainGoal(userAction));
    }

    static getMainGoal(userAction){
        if (userAction.intent === 'welcome') {
            return new WelcomeGoal();
        } else if (userAction.intent === 'start_vej') {
            return new VindEenJobGoal({});
        } else if (userAction.intent === 'filter_results') {
            return new VindEenJobGoal({filter: true});
            // } else if (iniative === 'start_schedule') {
            //     return new StartScheduleGoal(data);
            // } else if (iniative === 'stop_schedule') {
            //     return new StopScheduleGoal(data);
        } else {
            throw {name: 'RuntimeException', message: `No goal found for ${userAction.type}`};
        }
    }
}
