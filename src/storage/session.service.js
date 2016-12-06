class SessionService{
    constructor(){
        this.sessions = {};
    }

    setContext(sessionId, context){
        this.sessions[sessionId] = {
            context: context
        };
    }

    getContext(sessionId){
        if(this.sessions[sessionId]){
            return this.sessions[sessionId].context;
        } else {
            return {};
        }
    }
}
const sessionService = new SessionService();
module.exports = sessionService;
