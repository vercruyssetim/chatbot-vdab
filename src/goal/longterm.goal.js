export default class LongtermGoal {

    constructor(trueGoal) {
        this.trueGoal = trueGoal;

        this.speechService = null;
        this.actionService = null;
    }

    started(){
        this.speechService.started(this.trueGoal);
    }

    complete(){
        this.actionService.complete(this.trueGoal);
        this.speechService.complete(this.trueGoal);
    }

    canBeCompleted(){
        for (let index = 0; index < this.trueGoal.getShorttermGoals().length; index++) {
            let shorttermGoal = this.trueGoal.getShorttermGoals()[index];
            if (!shorttermGoal.isCompleted()) {
                return false;
            }
        }
        return true;
    }

    getNextShorttermGoal(){
        for (let index = 0; index < this.trueGoal.getShorttermGoals().length; index++) {
            let shorttermGoal = this.trueGoal.getShorttermGoals()[index];
            if (!shorttermGoal.isCompleted()) {
                return shorttermGoal;
            }
        }
        throw {name: 'ProgammingError', message: 'If all shorttermgoals are completed this method should not have been called'};
    }
}
