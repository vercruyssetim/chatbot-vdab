const Context = require('./context');

class ContextService {
    constructor() {
        this.contexts = {}
    }


    $onInit() {

    }

    getContext(userId, contextType) {
        if (!this.contexts[userId]) {
            this.contexts[userId] = {};
        }
        let context = this.contexts[userId][contextType];
        if (!context) {
            return Context.fromType(contextType);
        }
        return context;
    }

    setContext(userId, contexts) {
        if (!this.contexts[userId]) {
            this.contexts[userId] = {};
        }

        contexts.forEach((context) => {
            this.contexts[userId][context.getContextType()] = context;
        });
    }


}
const contextService = new ContextService();
contextService.$onInit();
module.exports = contextService;
