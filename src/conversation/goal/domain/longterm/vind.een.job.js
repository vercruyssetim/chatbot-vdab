import HasLocationGoal from '../shortterm/has.location.goal';
export default class VindEenJobGoal {
    constructor() {
        this.shorttermGoals = [
            new HasLocationGoal()
        ];
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }


}
