import WelcomeGoal from './welcome';
export default class GoalEngine {


    handleUserAction(context, userAction) {
        if (userAction.hasInitiative) {
            context.goal.mainGoal = this.getNewMainGoal(userAction.type, context.data);
        } else {
            if (!context.goal.currentGoal) {
                return 'error_no_goal';
            }
            if (context.goal.currentGoal.isFullFilledByAction(userAction.type)) {
                context.data[context.goal.currentGoal.name()] = userAction.value;
            } else {
                return `failed_${context.goal.currentGoal.name()}`;
            }
        }
        return 'success';
    }

    getNextGoal({goal, data}) {
        let nextGoal = this.calculateNextGoal(goal.mainGoal, data);
        goal.currentGoal = nextGoal;
        return goal.currentGoal.name();
    }

    calculateNextGoal(mainGoal, data) {
        for (let index = 0; index < mainGoal.getPrerequisites().length; index++) {
            let subGoal = mainGoal.getPrerequisites()[index];
            if (!subGoal.isFullFilled(data)) {
                return subGoal;
            }
        }
        return mainGoal;
    }

    getNewMainGoal(iniative, data) {
        if (iniative === 'welcome') {
            return new WelcomeGoal(data);
            // } else if (iniative === 'start_vej') {
            //     return new VejGoal(data);
            // } else if (iniative === 'filter_results') {
            //     return new FilterGoal(data);
            // } else if (iniative === 'start_schedule') {
            //     return new StartScheduleGoal(data);
            // } else if (iniative === 'stop_schedule') {
            //     return new StopScheduleGoal(data);
        } else {
            throw {name: 'RuntimeException', message: `No goal found for ${iniative}`};
        }
    }
}
