const {Wit, log} = require('node-wit');
const messageService = require('../message/messageService');
const sessionService = require('../session/sessionService');


class WitService {
    constructor(Wit, sessionService, messageService) {
        this.Wit = Wit;
        this.sessionService = sessionService;
        this.messageService = messageService;
        this.witClient = {};
    }

    $onInit() {
        this.witClient = new this.Wit({
            accessToken: '4KLPNU647TKNYKGL6BYHQZK2MIZSFSQI',
            actions: {
                send: this.send.bind(this),
                getForecast: this.getForecast.bind(this),
                getShopLocation: this.getShopLocation.bind(this)
            }
        });
    }

    handleInteractive(){
        return (bot, message) => {
            console.log(message);
            let sessionId = bot.conversation_id;
            let context = this.sessionService.getContext(sessionId);
            this.messageService.addSender(sessionId, bot);
            this.witClient.runActions(sessionId, message, context)
                .then((context) => {
                    this.sessionService.setContext(context);
                    this.messageService.removeSender(sessionId);
                })
                .catch(console.error);
        }
    }

    send(request, response) {
        const {sessionId, context, entities} = request;
        const {text, quickreplies} = response;
        console.log('receiving...', JSON.stringify(request));
        console.log('sending...', JSON.stringify(response));
        this.messageService.sendMessage(sessionId, response.text);
        return Promise.resolve();
    }

    getForecast({context, entities}) {
        let location = WitService.firstEntityValue(entities, 'location');
        if (location) {
            context.forecast = 'sunny in ' + location; // we should call a weather API here
            delete context.missingLocation;
        } else {
            context.missingLocation = true;
            delete context.forecast;
        }
        console.log('context: ', JSON.stringify(context));
        console.log('entities: ', JSON.stringify(entities));
        return Promise.resolve(context);
    }

    getShopLocation({context, entities}) {
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

const witService = new WitService(Wit, sessionService, messageService);
witService.$onInit();
module.exports = witService;
