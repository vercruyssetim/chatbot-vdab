import {Wit} from 'node-wit';
import senderRepository from '../storage/sender.repository';
import sessionRepository from '../storage/session.repository';
import propertiesService from '../storage/properties.service';

class WitService {
    constructor(Wit, sessionRepository, senderService, propertiesService) {
        this.Wit = Wit;
        this.userRepository = sessionRepository;
        this.senderRepository = senderService;
        this.propertiesService = propertiesService;
        this.witClient = {};
    }

    $onInit() {
        this.witClient = new this.Wit({
            accessToken: this.propertiesService.get('wit.ai.access.token'),
            actions: {
                send: this.send.bind(this),
                getForecast: WitService.getForecast.bind(this),
                getShopLocation: WitService.getShopLocation.bind(this)
            }
        });
    }

    handleInteractive(message, sessionId, sender) {
        this.senderService.addSender(sessionId, sender);
        this.witClient.runActions(sessionId, message, this.contextService.getSession(sessionId))
            .then((context) => {
                this.contextService.setContext(context);
                this.senderService.removeSender(sessionId);
            })
            .catch(console.error);
    }

    send(request, response) {
        const {sessionId} = request;
        // const {text, quickreplies} = response;
        console.log('sending from wit...', JSON.stringify(response.text));
        this.senderService.sendMessage(sessionId, response.text);
        return Promise.resolve();
    }

    static getForecast({context, entities}) {
        let location = WitService.firstEntityValue(entities, 'location');
        if (location) {
            context.forecast = 'sunny in ' + location; // we should call a weather API here
            delete context.missingLocation;
        } else {
            context.missingLocation = true;
            delete context.forecast;
        }
        return Promise.resolve(context);
    }

    static getShopLocation({context, entities}) {
        context.location = WitService.firstEntityValue(entities, 'shop') + 'vile';
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

const witService = new WitService(Wit, sessionRepository, senderRepository, propertiesService);
witService.$onInit();
export default witService;
