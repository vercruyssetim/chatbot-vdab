import GoalFactory from './goal/goal.factory';
import ContextFactory from './context.factory';
export default class ConversationService {

    constructor(senderService, userService, contextRepository) {
        this.contextRepository = contextRepository;
        this.senderService = senderService;
        this.userService = userService;
        this.contexts = {};
    }


    getResponse(userAction, sessionId) {
        this.getContext(sessionId)
            .then((context) => {
                this.handleUserAction(userAction, context);
                this.tryToCompleteMainGoal(context);
                this.contextRepository.update(ContextFactory.toData(context));
            })
            .catch((error) => {
                console.log(error);
            });

        // console.log(`data ${JSON.stringify(data)}`);
        // console.log(`entities ${JSON.stringify(entities)}`);
        // console.log(`action ${JSON.stringify(action)}`);

    }

    handleUserAction(userAction, {data, goal, speech}) {
        if (userAction.hasInitiative) {
            let longtermGoal = GoalFactory.getNewMainGoal(userAction, data);
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
            this.contexts[sessionId] = this.contextRepository.findOne({_id: sessionId})
                .then((context) => {
                    if (!context) {
                        return Promise.resolve(ContextFactory.createNewContext(sessionId, this.userService.getUser(sessionId), this.senderService));
                    }
                    return Promise.resolve(ContextFactory.fromData(context, this.senderService));
                });
        }
        return this.contexts[sessionId];
    }
}
