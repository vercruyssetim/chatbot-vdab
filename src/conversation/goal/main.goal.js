export default class MainGoal {

    constructor(trueGoal) {
        this.trueGoal = trueGoal;
    }

    getName() {
        return this.trueGoal.getName();
    }

    start(...args) {
        if (this.trueGoal.start) {
            this.trueGoal.start(...args);
        }
    }

    complete(...args) {
        if (this.trueGoal.complete) {
            this.trueGoal.complete(...args);
        }
    }

    completeData(...args) {
        if (this.trueGoal.completeData) {
            this.trueGoal.completeData(...args);
        }
    }

    startData(...args) {
        if (this.trueGoal.startData) {
            this.trueGoal.startData(...args);
        }
    }

    completeGoal(...args) {
        if (this.trueGoal.completeGoal) {
            this.trueGoal.completeGoal(...args);
        }
    }

    isCompletedBy(data) {
        for (let index = 0; index < this.trueGoal.getShorttermGoals().length; index++) {
            let shorttermGoal = this.trueGoal.getShorttermGoals()[index];
            if (!shorttermGoal.isCompletedBy(data)) {
                return false;
            }
        }
        return true;
    }

    getShorttermGoals() {
        return this.trueGoal.getShorttermGoals();
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
