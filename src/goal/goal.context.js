import GoalFactory from './goal.factory';
export default class GoalContext {

    constructor() {
        this.speechService = null;

        this.longtermGoal = null;
        this.shorttermGoal = null;
    }

    handleUserAction(userAction, data) {
        if (userAction.hasInitiative) {
            this.longtermGoal = GoalFactory.getNewMainGoal(userAction, data);
            this.longtermGoal.started();
        } else {
            if (!this.hasOpenQuestion()) {
                this.speechService.error(data.sessionId);
            } else {
                if(this.shorttermGoal.isCompletedBy(userAction)){
                    this.shorttermGoal.complete(userAction);
                    this.shorttermGoal = null;
                } else {
                    this.shorttermGoal.failed();
                }
            }
        }
    }

    tryToCompleteMainGoal(){
        if (this.hasMainGoal() && !this.hasOpenQuestion()) {
            if(this.longtermGoal.canBeCompleted()){
                this.longtermGoal.complete();
                this.longtermGoal = null;
            } else {
                this.shorttermGoal = this.longtermGoal.getNextShorttermGoal();
                this.shorttermGoal.started();
            }
        }
    }

    hasMainGoal(){
        return this.longtermGoal !== null || this.longtermGoal !== undefined;
    }

    hasOpenQuestion(){
        return this.shorttermGoal !== null || this.shorttermGoal !== undefined;
    }
}
