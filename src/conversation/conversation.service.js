const apiEndpoint = require('../ai/api.endpoint');
const contextService = require('../context/context.repository');
const backendService = require('../backend/backend.stub');
const Context = require('../context/context');

class ConversationService {

    constructor(apiEndpoint, contextService, backendService) {
        this.apiEndpoint = apiEndpoint;
        this.contextService = contextService;
        this.backendService = backendService;
        this.handlers = {};
    }

    $onInit() {
        this.handlers['save.username'] = (message, sender, response) => this.handleSaveUsername(message, sender, response);
        this.handlers['start.orientation'] = (message, sender, response) => this.handleStartOrientation(message, sender, response);
        this.handlers['save.answer'] = (message, sender, response) => this.handleSaveAnswer(message, sender, response);
        this.handlers['default'] = (message, sender, response) => this.handleDefault(message, sender, response);
    }

    handleRequest(message, sender) {
        this.apiEndpoint.sendQuery(message.text, message.userId, (response) => {
            let handler = this.handlers[response.action];
            if (!response.incomplete && handler) {
                handler(message, sender, response);
            } else {
                this.handlers['default'](message, sender, response);
            }
        })
    }

    handleStartOrientation(message, sender, response) {
        sender({text: response.text});
        let context = this.contextService.getContext(message.userId, 'orientation-question')
            .withParameter("username", this.backendService.getUsername(message.userId));
        this.apiEndpoint.sendContext(context, message.userId, () => {
            message.text = 'START.CONVERSATION';
            this.handleRequest(message, sender);
        });
    }

    handleSaveAnswer(message, sender, response) {
        sender({text: response.text});
        this.backendService.saveParameter(message.userId, response.parameters);
        this.sendOrientationEndMessage(message, sender);
        let context = this.contextService.getContext(message.userId, 'orientation-question');
        context.handleEnd();
    }

    handleDefault(message, sender, response) {
        sender({text: response.text, quickReplies: response.quickReplies});
        this.contextService.setContext(message.userId, response.contexts);
    }

    sendOrientationEndMessage(message, sender) {
        let contexts = Context.fromType('orientation-end')
            .withParameter('answerList', this.backendService.answersToString(message.userId, 'orientation'));
        this.apiEndpoint.sendContext(contexts, message.userId, () => {
            message.text = 'END.CONVERSATION';
            this.handleRequest(message, sender);
        });
    }

    handleSaveUsername(message, sender, response){
        sender({text: response.text});
        this.backendService.saveUsername(message.userId, response.parameters.username);
    }
}
const conversationService = new ConversationService(apiEndpoint, contextService, backendService);
conversationService.$onInit();
module.exports = conversationService;