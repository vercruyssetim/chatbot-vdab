export default class HasLocationGoal {

    isCompleted(contextData) {
        return contextData.hasLocation !== null || contextData.hasLocation !== undefined;
    }
}