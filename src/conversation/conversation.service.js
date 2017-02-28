import GoalContext from './goal/goal.context';
import GoalFactory from './goal/goal.factory';
import SpeechContext from './speech/speech.context';
import DataContext from './data/data.context';
export default class ConversationService {

    constructor(senderService, userService) {
        this.contexts = {};
        this.senderService = senderService;
        this.userService = userService;
    }


    getResponse(userAction, sessionId) {
        let context = this.getContext(sessionId);

        this.handleUserAction(userAction, context);
        this.tryToCompleteMainGoal(context);

        // console.log(`data ${JSON.stringify(data)}`);
        // console.log(`entities ${JSON.stringify(entities)}`);
        // console.log(`action ${JSON.stringify(action)}`);

    }

    handleUserAction(userAction, {data, goal, speech}) {
        if (userAction.hasInitiative) {
            let longtermGoal = GoalFactory.getNewMainGoal(userAction);
            goal.startMainGoal(longtermGoal);
            data.start(longtermGoal, userAction);
            speech.start(longtermGoal, data);
        } else {
            if (!goal.hasOpenQuestion()) {
                speech.error();
            } else {
                if (goal.isShortTermGoalCompletedBy(userAction)) {
                    data.complete(goal.getShortTermGoal(), userAction);
                    speech.complete(goal.getShortTermGoal(), data);
                    goal.completeShortTermGoal();
                } else {
                    speech.failed(goal.getShortTermGoal());
                }
            }
        }
    }

    tryToCompleteMainGoal({data, goal, speech}) {
        if (goal.hasMainGoal() && !goal.hasOpenQuestion()) {
            if (goal.isMainGoalCompletedBy(data)) {
                data.complete(goal.getMainGoal(), data);
                speech.complete(goal.getMainGoal(), data);
                goal.completeMainGoal();
            } else {
                goal.nextShortTermGoal(data);
                speech.start(goal.getShortTermGoal(), data);
            }
        }
    }


    getContext(sessionId) {
        if (!this.contexts[sessionId]) {
            this.contexts[sessionId] = {
                data: new DataContext(sessionId, this.userService.getUser(sessionId)),
                goal: new GoalContext(),
                speech: new SpeechContext(sessionId, this.senderService)
            };
        }
        return this.contexts[sessionId];
    }

}
