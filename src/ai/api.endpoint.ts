import * as apiai from "apiai";
import {Context} from "../context/context";
import {ApiAi} from "apiai";

export class ApiEndpoint {
    private apiai: ApiAi.ApiAiClient;

    constructor(apiAiAccessToken: string) {
        this.apiai = apiai(apiAiAccessToken);
    }

    sendQuery(text, sessionId, callBack) {
        let request = this.apiai.textRequest(text, {
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
        let request = this.apiai.eventRequest(event, {
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

    static mapToQuickReplies(messages) {
        let quickReplies = messages.filter((message) => message.type === 2)[0];
        return quickReplies ? quickReplies.replies : null;
    }

    sendContext(contexts: Context, sessionId, callBack) {
        console.log(`sending context ${JSON.stringify(contexts)}`);
        let request = this.apiai.contextsRequest(contexts, {
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

