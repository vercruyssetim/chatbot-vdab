export default class GoalContext {

    constructor() {
        this.mainGoal = null;
        this.shorttermGoal = null;
    }

    startMainGoal(mainGoal) {
        this.mainGoal = mainGoal;
        this.shorttermGoal = null;
    }

    completeMainGoal(data) {
        let oldMainGoal = this.mainGoal;
        this.mainGoal = null;
        if (oldMainGoal.completeGoal) {
            oldMainGoal.completeGoal(this, data.data);
        }
    }

    getMainGoal() {
        return this.mainGoal;
    }

    isMainGoalCompletedBy(data) {
        return this.mainGoal.isCompletedBy(data.data);
    }

    hasMainGoal() {
        return this.mainGoal !== null;
    }

    nextShortTermGoal(data) {
        this.shorttermGoal = this.mainGoal.getNextShorttermGoal(data.data);
    }

    completeShortTermGoal(data) {
        let oldShorttermGoal = this.shorttermGoal;
        this.shorttermGoal = null;
        if (oldShorttermGoal.completeGoal) {
            oldShorttermGoal.completeGoal(this, data.data);
        }
    }

    getShortTermGoal() {
        return this.shorttermGoal;
    }

    isShortTermGoalCompletedBy(userAction) {
        return this.shorttermGoal.isCompletedByUserAction(userAction);
    }

    hasOpenQuestion() {
        return this.shorttermGoal !== null;
    }
}
