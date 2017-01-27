import {Wit} from 'node-wit';
import Promise from 'Promise';

export default class WitClient {

    constructor(sessionRepository, senderService, witAiAccessToken) {
        this.sessionRepository = sessionRepository;
        this.senderService = senderService;
        this.witClient = new Wit({
            accessToken: witAiAccessToken,
            actions: {
                send: this.send.bind(this),
                saveLocation: WitClient.saveLocation.bind(this)
            }
        });
    }

    handleMessageReceived(message, sessionId, sender) {
        this.senderService.addSender(sessionId, sender);
        this.witClient.runActions(sessionId, message, this.sessionRepository.getContext(sessionId))
            .then((context) => {
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

    static saveLocation({context, entities}){
        context.location = WitClient.firstEntityValue(entities, 'location');
        return Promise.resolve(context);
    }

    static firstEntityValue(entities, entity) {
        const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }
}
