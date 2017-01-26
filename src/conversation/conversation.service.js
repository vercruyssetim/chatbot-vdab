import Context from '../context/context';

export default class ConversationService {

    constructor(apiEndpoint, contextService, backendService) {
        this.apiEndpoint = apiEndpoint;
        this.contextService = contextService;
        this.backendService = backendService;
        this.handlers = {};
        this.initHandlers();
    }

    initHandlers() {
        this.handlers['save.username'] = (message, sender, response) => this.handleSaveUsername(message, sender, response);
        this.handlers['start.orientation'] = (message, sender, response) => this.handleStartOrientation(message, sender, response);
        this.handlers['save.answer'] = (message, sender, response) => this.handleSaveAnswer(message, sender, response);
        this.handlers['clear.data'] = (message, sender, response) => this.handleClearData(sender, response);
        this.handlers['default'] = (message, sender, response) => this.handleDefault(message, sender, response);
    }

    handleRequest(message, sender) {
        console.log(`incoming request ${message.text}`);
        this.apiEndpoint.sendQuery(message.text, message.userId, (response) => {
            console.log(`outgoing request ${response.action}`);
            let handler = this.handlers[response.action];
            if (!response.incomplete && handler) {
                handler(message, sender, response);
            } else {
                this.handlers['default'](message, sender, response);
            }
        });
    }

    handleStartOrientation(message, sender, response) {
        sender({text: response.text});
        let context = this._getContextOfNextQuestion(message);
        this.apiEndpoint.sendContext(
            context.withParameter('username', this._getUsername(message.userId)),
            message.userId, () => {
                message.text = 'START.CONVERSATION';
                this.handleRequest(message, sender);
            });
    }

    handleSaveAnswer(message, sender, response) {
        sender({text: response.text});
        this.backendService.saveParameter(message.userId, response.parameters);
        this._sendOrientationEndMessage(message, sender);
        this._prepareForNextQuestion(message);
    }

    handleSaveUsername(message, sender, response) {
        sender({text: response.text});
        this.backendService.saveUsername(message.userId, response.parameters.username);
    }

    handleClearData(sender, response){
        sender({text: response.text});
        this.backendService.clearData();
        this.contextService.clearData();
    }

    handleDefault(message, sender, response) {
        console.log(response.text);
        console.log(JSON.stringify(response.contexts));
        sender({text: response.text, quickReplies: response.quickReplies});
        this.contextService.setContexts(message.userId, response.contexts);
    }


    _prepareForNextQuestion(message) {
        let nextQuestion = this.backendService.getNextQuestion('orientation');
        this.contextService.setContext(message.userId, Context.fromType('orientation-question', nextQuestion));
    }

    _getContextOfNextQuestion(message) {
        let context = this.contextService.getContext(message.userId, 'orientation-question');
        if(!context){
            return Context.fromType('orientation-question', this.backendService.getStartQuestionIndex('orientation'));
        }
        return context;
    }

    _getUsername(userId) {
        let username = this.backendService.getUsername(userId);
        if (!username) {
            return 'mister_unknown';
        }
        return username;
    }
    _sendOrientationEndMessage(message, sender) {
        let contexts = Context.fromType('orientation-end')
            .withParameter('answerList', this.backendService.answersToString(message.userId, 'orientation'));
        this.apiEndpoint.sendContext(contexts, message.userId, () => {
            message.text = 'END.CONVERSATION';
            this.handleRequest(message, sender);
        });
    }
}