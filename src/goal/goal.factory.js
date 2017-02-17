import WelcomeGoal from './welcome';
import MainGoal from './main.goal';
export default class GoalFactory{

    static getNewMainGoal(userAction){
        if (userAction.type === 'welcome') {
            return new MainGoal(new WelcomeGoal());
            // } else if (iniative === 'start_vej') {
            //     return new VejGoal(data);
            // } else if (iniative === 'filter_results') {
            //     return new FilterGoal(data);
            // } else if (iniative === 'start_schedule') {
            //     return new StartScheduleGoal(data);
            // } else if (iniative === 'stop_schedule') {
            //     return new StopScheduleGoal(data);
        } else {
            throw {name: 'RuntimeException', message: `No goal found for ${userAction.type}`};
        }
    }
}
