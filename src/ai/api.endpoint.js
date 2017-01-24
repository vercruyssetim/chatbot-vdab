import apiai from 'apiai';
import propertiesService from '../storage/properties.service';
import Context from '../context/context';

class ApiEndpoint {
    constructor(apiai, propertiesService) {
        this.apiai = apiai;
        this.propertiesService = propertiesService;
    }

    $onInit() {
        this.app = apiai(this.propertiesService.get('api.ai.access.token'));
    }

    sendQuery(text, sessionId, callBack) {
        let request = this.app.textRequest(text, {
            sessionId
        });
        request.on('response', (response) => {
            callBack(this.mapToQueryResponse(response));
        });
        request.on('error', () => {
            console.log('error');
        });
        request.end();
    }

    sendEvents(event, sessionId, callBack) {
        let request = this.app.eventRequest(event, {
            sessionId
        });
        request.on('response', (response) => {
            callBack(this.mapToQueryResponse(response));
        });
        request.on('error', () => {
            console.log('error');
        });
        request.end();
    }


    mapToQueryResponse(response) {
        return {
            incomplete: response.result.actionIncomplete,
            text: response.result.fulfillment.speech,
            action: response.result.action,
            parameters: response.result.parameters,
            contexts: response.result.contexts.map((context) => new Context(context)),
            quickReplies: ApiEndpoint.mapToQuickReplies(response.result.fulfillment.messages)
        };
    }

    static mapToQuickReplies(messages){
        let quickReplies = messages.filter((message) => message.type === 2)[0];
        return quickReplies ? quickReplies.replies : null;
    }

    sendContext(contexts, sessionId, callBack) {
        console.log(`sending context ${JSON.stringify(contexts)}`);
        let request = this.app.contextsRequest(contexts, {
            sessionId
        });
        request.on('response', (response) => {
            callBack(response);
        });
        request.on('error', (error) => {
            console.log(error);
        });
        request.end();
    }
}

const apiEndpoint = new ApiEndpoint(apiai, propertiesService);
apiEndpoint.$onInit();
export default apiEndpoint;

