const apiEndpoint = require('../ai/api.endpoint');
const contextService = require('../context/context.repository');
const Context = require('../context/context');

class ConversationService {

    constructor(apiEndpoint, contextService) {
        this.apiEndpoint = apiEndpoint;
        this.contextService = contextService;
        this.handlers = {};
    }

    $onInit() {
        this.handlers['start.orientation'] = (message, sender, response) => this.handleStartOrientation(message, sender, response);
        this.handlers['save.answer'] = (message, sender, response) => this.handleSaveAnswer(message, sender, response);
        this.handlers['default'] = (message, sender, response) => this.handleDefault(message, sender, response);
    }

    handleRequest(message, sender) {
        this.apiEndpoint.sendQuery(message.text, message.userId, (response) => {
            let handler = this.handlers[response.action];
            if (handler) {
                handler(message, sender, response);
            } else {
                this.handlers['default'](message, sender, response);
            }
        })
    }

    handleStartOrientation(message, sender) {
        let context = this.contextService.getContext(message.userId, 'orientation-question');
        this.apiEndpoint.sendContext(context, message.userId, () => {
            message.text = 'START.CONVERSATION';
            this.handleRequest(message, sender);
        });
    }

    handleSaveAnswer(message, sender, response) {
        sender({text: response.text});

        this.apiEndpoint.sendContext(Context.fromType('orientation-end'), message.userId, () => {
            message.text = 'END.CONVERSATION';
            this.handleRequest(message, sender);
        });

        let context = this.contextService.getContext(message.userId, 'orientation-question');
        context.handleEnd();
    }

    handleDefault(message, sender, response) {
        console.log(JSON.stringify(response.contexts));
        this.contextService.setContext(message.userId, response.contexts);
        sender({text: response.text, quickReplies: response.quickReplies});
    }
}
const conversationService = new ConversationService(apiEndpoint, contextService);
conversationService.$onInit();
module.exports = conversationService;