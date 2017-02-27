export default class GoalContext {

    constructor() {
        this.speechService = null;
        this.actionService = null;

        this.mainGoal = null;
        this.shorttermGoal = null;
    }

    startMainGoal(mainGoal) {
        this.mainGoal = mainGoal;
    }

    completeMainGoal(){
        this.mainGoal = null;
    }

    getMainGoal(){
        return this.mainGoal;
    }

    isMainGoalCompletedBy(data){
        return this.mainGoal.isCompletedBy(data);
    }

    hasMainGoal() {
        return this.mainGoal !== null || this.mainGoal !== undefined;
    }

    nextShortTermGoal(data){
        this.shorttermGoal = this.mainGoal.getNextShorttermGoal(data);
    }

    completeShortTermGoal(){
        this.shorttermGoal = null;
    }

    getShortTermGoal(){
        return this.shorttermGoal;
    }

    isShortTermGoalCompletedBy(userAction) {
        return this.shorttermGoal.isCompletedBy(userAction);
    }

    hasOpenQuestion() {
        return this.shorttermGoal !== null || this.shorttermGoal !== undefined;
    }
}
