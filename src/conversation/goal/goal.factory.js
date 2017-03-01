import WelcomeGoal from './domain/longterm/welcome';
import MainGoal from './main.goal';
import VindEenJobGoal from './domain/longterm/vind.een.job';
import ByeGoal from './domain/longterm/bye';
import StartSchedule from './domain/longterm/start.schedule';
import StopSchedule from './domain/longterm/stop.schedule';
export default class GoalFactory {

    static getNewMainGoal(userAction) {
        return new MainGoal(GoalFactory.getMainGoal(userAction));
    }

    static getMainGoal(userAction) {
        if (userAction.intent === 'welcome') {
            return new WelcomeGoal();
        } else if (userAction.intent === 'start_vej') {
            return new VindEenJobGoal({});
        } else if (userAction.intent === 'filter_results') {
            return new VindEenJobGoal({filter: true});
        } else if (userAction.intent === 'bye') {
            return new ByeGoal();
        } else if (userAction.intent === 'start_schedule') {
            return new StartSchedule();
        } else if (userAction.intent === 'stop_schedule') {
            return new StopSchedule();
        } else {
            throw {name: 'RuntimeException', message: `No goal found for ${userAction.type}`};
        }
    }
}
