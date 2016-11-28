class SessionService{
    constructor(){
        this.sessionService = {};
    }

    setContext(sessionId, context){
        this.sessionService[sessionId] = {
            context: context
        };
    }

    getContext(sessionId){
        return this.sessionService[sessionId].context;
    }
}
module.exports = SessionService;
