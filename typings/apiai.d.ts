export as namespace apiAiLib;

export = ApiAi;

declare function ApiAi(accessToken: string): ApiAi.ApiAiClient;

declare namespace ApiAi {

    interface ApiAiClient {
        textRequest(text: string, sessionId: any): ApiAi.Request;
        eventRequest(event: any, sessionId: any): ApiAi.Request;
        contextsRequest(contexts: any, sessionId: any): ApiAi.Request;
    }

    interface Request {
        on(type: string, callback: (response: any) => void);
        end();
    }
}

declare namespace ApiAi {

}
