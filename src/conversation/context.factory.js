import DataContext from './data/data.context';
import GoalContext from './goal/goal.context';
import SpeechContext from './speech/speech.context';
import GoalFactory from './goal/goal.factory';
export default class ContextFactory {

    static createNewContext(sessionId, user, senderService) {
        return {
            sessionId,
            data: new DataContext(sessionId, user),
            goal: new GoalContext(),
            speech: new SpeechContext(sessionId, senderService)
        };
    }

    static toData({sessionId, data, goal}) {
        return {
            _id: sessionId,
            data: data.data,
            goal: {
                mainGoal: goal.mainGoal ? goal.mainGoal.trueGoal.name : '',
                shorttermGoal: goal.shorttermGoal ? goal.shorttermGoal.name : ''
            }
        };
    }

    static fromData({_id, data, goal}, senderService) {
        let context = {
            sessionId: _id,
            data: new DataContext(),
            goal: new GoalContext(),
            speech: new SpeechContext(_id, senderService)
        };
        context.goal.mainGoal = GoalFactory.newMainGoal(goal.mainGoal);
        context.goal.shorttermGoal = GoalFactory.newShortTermGoal(goal.shorttermGoal);
        context.data.data = data;
        return context;
    }
}
