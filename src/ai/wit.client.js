import {Wit} from 'node-wit';
import Promise from 'Promise';

export default class WitClient {

    constructor(sessionRepository, senderService, witAiAccessToken, backendService) {
        this.sessionRepository = sessionRepository;
        this.senderService = senderService;
        this.backendService = backendService;
        this.witClient = new Wit({
            accessToken: witAiAccessToken,
            actions: {
                send: this.send.bind(this),
                saveLocation: (call) => this.backendService.saveLocation(call),
                saveKeyword: (call) => this.backendService.saveKeyword(call),
                lookupJobs: (call) => this.backendService.lookupJobs(call),
                clearData: (call) => this.backendService.clearData(call),
                showFilters: (call) => this.backendService.showFilters(call),
                showFilterOptions: (call) => this.backendService.showFilterOptions(call),
                saveLiteralKeyword: (call) => this.backendService.saveLiteralKeyword(call),
                saveFilterOption: (call) => this.backendService.saveFilterOption(call)
            }
        });
    }

    handleMessageReceived(message, sessionId, sender) {
        this.senderService.addSender(sessionId, sender);
        this.witClient.runActions(sessionId, message, this.sessionRepository.getContext(sessionId), 7)
            .then((context) => {
                console.log(`context after wit call: ${JSON.stringify(context)}`);
                this.sessionRepository.setContext(sessionId, context);
                this.senderService.removeSender(sessionId);
            })
            .catch(console.error);
    }

    send(request, response) {
        const {sessionId} = request;
        // const {text, quickreplies} = response;
        console.log('sending from wit...', JSON.stringify(response.text));
        this.senderService.sendMessage(sessionId, response);
        return Promise.resolve();
    }
}
