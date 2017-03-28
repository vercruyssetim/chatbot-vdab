import apiai from 'apiai';
import ApiMapper from './api.mapper';

export default class ApiClient {

    constructor(apiAiAccessToken) {
        this.apiClient = apiai(apiAiAccessToken);
    }

    sendQuery(text, sessionId) {
        return new Promise((resolve) => {
            this.apiClient.textRequest(text, {
                sessionId
            }).on('response', (response) => {
                resolve(ApiMapper.extractEntities(response));
            }).on('error', () => {
                console.log('error');
            }).end();
        });
    }

    sendEvents(event, sessionId, callBack) {
        this.app.eventRequest(event, {
            sessionId
        }).on('response', (response) => {
            callBack(response);
        }).on('error', () => {
            console.log('error');
        }).end();
    }

    sendContext(contexts, sessionId, callBack) {
        this.app.contextsRequest(contexts, {
            sessionId
        }).on('response', (response) => {
            callBack(response);
        }).on('error', (error) => {
            console.log(error);
        }).end();
    }

}


