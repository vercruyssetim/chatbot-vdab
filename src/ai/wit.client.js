import {Wit} from 'node-wit';
import WitMapper from './wit.mapper';

export default class WitClient {

    constructor(senderService, witAiAccessToken, backendService, conversationService) {
        this.senderService = senderService;
        this.backendService = backendService;
        this.conversationService = conversationService;
        this.witClient = new Wit({
            accessToken: witAiAccessToken,
        });
    }

    handleMessageReceived(message, sessionId, sender) {
        this.senderService.addSender(sessionId, sender);
        this.witClient.message(message)
            .then((data) => {
                this.conversationService.getResponse(WitMapper.extractUserAction(WitMapper.extractEntities(data)), sessionId);
            })
            .catch(console.error);
    }
}
