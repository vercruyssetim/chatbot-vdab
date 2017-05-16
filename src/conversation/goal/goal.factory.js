import WelcomeGoal from './domain/longterm/welcome';
import MainGoal from './main.goal';
import VindEenJobGoal from './domain/longterm/vind.een.job';
import ByeGoal from './domain/longterm/bye';
import StartSchedule from './domain/longterm/start.schedule';
import StopSchedule from './domain/longterm/stop.schedule';
import HasLocationGoal from './domain/shortterm/has.location.goal';
import HasKeywordGoal from './domain/shortterm/has.keyword.goal';
import FilterGoal from './domain/shortterm/has.filter.goal';
import AcceptNextGoal from './domain/shortterm/accept.next.goal';
import Hungry from './domain/longterm/hungry';
import BladSteenSchaarGoal from './domain/longterm/blad.steen.schaar';
import BladSteenSchaarChoiceGoal from './domain/shortterm/blad.steen.schaar.choice';
import ConfirmInputGoal from './domain/shortterm/confirm.input.goal';
import JaNeeGoal from './domain/shortterm/ja.nee.goal';
import DiplomaGoal from './domain/shortterm/diploma.goal';
export default class GoalFactory {

    static getNewMainGoal(userAction, data) {
        return new MainGoal(GoalFactory.getMainGoal(userAction, data.data));
    }

    static getMainGoal(userAction, data) {
        if (userAction.intent === 'welcome') {
            return new WelcomeGoal(data);
        } else if (userAction.intent === 'start_vej') {
            return new VindEenJobGoal(data, {});
        } else if (userAction.intent === 'filter_results') {
            return new VindEenJobGoal(data, {filter: true});
        } else if (userAction.intent === 'bye') {
            return new ByeGoal(data);
        } else if (userAction.intent === 'blad_steen_schaar') {
            return new BladSteenSchaarGoal(data);
        } else if (userAction.intent === 'start_schedule') {
            return new StartSchedule(data);
        } else if (userAction.intent === 'stop_schedule') {
            return new StopSchedule(data);
        } else if (userAction.intent === 'hungry') {
            return new Hungry(data);
        } else {
            throw {name: 'RuntimeException', message: `No goal found for ${userAction.type}`};
        }
    }

    static newMainGoal(name, data = {}) {
        if (name === 'welcome') {
            return new MainGoal(new WelcomeGoal(data));
        } else if (name === 'VindEenJob') {
            return new MainGoal(new VindEenJobGoal(data, false));
        } else if (name === 'filter') {
            return new MainGoal(new VindEenJobGoal(data, {filter: true}));
        } else if (name === 'bye') {
            return new MainGoal(new ByeGoal(data));
        } else if (name === 'bladSteenSchaar') {
            return new MainGoal(new BladSteenSchaarGoal(data));
        } else if (name === 'startSchedule') {
            return new MainGoal(new StartSchedule(data));
        } else if (name === 'stopSchedule') {
            return new MainGoal(new StopSchedule(data));
        } else if (name === 'hungry') {
            return new MainGoal(new Hungry(data));
        } else {
            return null;
        }
    }

    static newShortTermGoal(name, data = {}) {
        if (name === 'hasLocation') {
            return new HasLocationGoal(data);
        } else if (name === 'hasKeyword') {
            return new HasKeywordGoal(data);
        } else if (name === 'hasFilter') {
            return new FilterGoal(data);
        } else if (name === 'acceptNext') {
            return new AcceptNextGoal(data);
        } else if (name === 'confirmInput') {
            return new ConfirmInputGoal(data);
        } else if (name === 'bladSteenSchaarChoice') {
            return new BladSteenSchaarChoiceGoal(data);
        } else if (name === 'jaNee') {
            return new JaNeeGoal(data);
        } else if (name === 'diploma') {
            return new DiplomaGoal(data);
        } else {
            return null;
        }
    }
}
