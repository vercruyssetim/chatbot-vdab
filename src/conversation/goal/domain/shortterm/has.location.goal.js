export default class HasLocationGoal {

    isCompleted(contextData) {
        return contextData.hasLocation !== null || contextData.hasLocation !== undefined;
    }

    isCompletedBy(userAction){
        return userAction.type === 'telling_location' && userAction;
    }

    complete(){

    }
}