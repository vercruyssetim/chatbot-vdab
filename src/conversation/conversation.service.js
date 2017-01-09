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
        this.handlers['end.orientation'] = (message, sender, response) => this.handleEndOrientation(message, sender, response);
        this.handlers['default'] = (message, sender, response) => this.handleDefault(message, sender, response);
    }

    handleRequest(message, sender) {
        this.apiEndpoint.sendQuery(message.text, message.userId, (response) => {
            let handler = this.handlers[response.action];
            if(handler){
                handler(message, sender, response);
            } else {
                this.handlers['default'](message, sender, response);
            }
        })
    }

    handleStartOrientation(message, sender){
        let context = this.contextService.getContext(message.userId, 'orientation');
        console.log(context);
        this.apiEndpoint.sendContext(context, message.userId, () => {
            message.text = 'RESTART.CONVERSATION';
            this.handleRequest(message, sender);
        });
    }

    handleEndOrientation(message, sender){
        let context = this.contextService.getContext(message.userId, 'orientation');
        context.handleEnd();

        this.apiEndpoint.sendContext(Context.fromType('end_orientation'), message.userId, () => {
            message.text = 'END.CONVERSATION';
            this.handleRequest(message, sender);
        });
    }

    handleDefault(message, sender, response){
        this.contextService.setContext(message.userId, response.contexts);
        sender(response.text);
    }
}
const conversationService = new ConversationService(apiEndpoint, contextService);
conversationService.$onInit();
module.exports = conversationService;