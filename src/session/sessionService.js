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
        if(this.sessionService[sessionId]){
            return this.sessionService[sessionId].context;
        } else {
            return {};
        }
    }
}
module.exports = SessionService;
