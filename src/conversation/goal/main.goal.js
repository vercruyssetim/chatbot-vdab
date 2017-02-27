export default class MainGoal {

    constructor(trueGoal) {
        this.trueGoal = trueGoal;
    }

    getName() {
        return this.trueGoal.getName();
    }

    start(...args) {
        this.trueGoal.start(...args);
    }

    complete(...args) {
        this.trueGoal.complete(...args);
    }

    isCompletedBy() {
        for (let index = 0; index < this.trueGoal.getShorttermGoals().length; index++) {
            let shorttermGoal = this.trueGoal.getShorttermGoals()[index];
            if (!shorttermGoal.isCompleted()) {
                return false;
            }
        }
        return true;
    }

    getNextShorttermGoal(data) {
        for (let index = 0; index < this.trueGoal.getShorttermGoals().length; index++) {
            let shorttermGoal = this.trueGoal.getShorttermGoals()[index];
            if (!shorttermGoal.isCompletedBy(data)) {
                return shorttermGoal;
            }
        }
        throw {
            name: 'ProgammingError',
            message: 'If all shorttermgoals are completed this method should not have been called'
        };
    }
}
