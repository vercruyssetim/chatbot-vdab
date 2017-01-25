import {Context} from "./context";
export class ContextService {
    private contexts: {[userId: string]: {[contextType: string]: Context}};

    getContext(userId, contextType) {
        if (!this.contexts[userId]) {
            this.contexts[userId] = {};
        }
        return this.contexts[userId][contextType];
    }

    setContexts(userId, contexts) {
        if (!this.contexts[userId]) {
            this.contexts[userId] = {};
        }

        contexts.forEach((context) => {
            this.contexts[userId][context.getContextType()] = context;
        });
    }

    setContext(userId, context) {
        this.setContexts(userId, [context]);
    }

    clearData() {
        this.contexts = {};
    }


}
