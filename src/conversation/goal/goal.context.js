export default class GoalContext {

    constructor() {
        this.mainGoal = null;
        this.shorttermGoal = null;
    }

    startMainGoal(mainGoal) {
        this.mainGoal = mainGoal;
        this.shorttermGoal = null;
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
        return this.mainGoal !== null;
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
        return this.shorttermGoal.isCompletedByUserAction(userAction);
    }

    hasOpenQuestion() {
        return this.shorttermGoal !== null;
    }
}
