import {SlackServer} from "./server/slack.server";
import {FacebookServer} from "./server/facebook.server";
import {PropertiesService} from "./storage/properties.service";
import {WitService} from "./ai/wit.service";
import {ExpressServer} from "./server/web.server";
import {ApiEndpoint} from "./ai/api.endpoint";
import {ApiAi} from "apiai";
import {SenderService} from "./storage/sender.repository";
import {SessionService} from "./storage/session.repository";
import {ApiAiWebhook} from "./webhook/api.ai.webhook";
import {BackendStub} from "./backend/backend.stub";
import {ConversationService} from "./conversation/conversation.service";
import {ContextService} from "./context/context.repository";

export class ApplicationConfig {
    private slackServer: SlackServer;
    private facebookServer: FacebookServer;
    private propertiesService: PropertiesService;
    private witService: WitService;
    private apiService: ApiEndpoint;
    private expressServer: ExpressServer;
    private senderService: SenderService;
    private sessionService: SessionService;
    private apiAiWebhook: ApiAiWebhook;
    private backendStub: BackendStub;
    private conversationService: ConversationService;
    private contextService: ContextService;

    getSlackServer(): SlackServer {
        if (!this.slackServer) {
            this.slackServer = new SlackServer(this.getWebserver(), this.getWitService(), this.getApiEndpoint());
        }
        return this.slackServer;
    }

    getFacebookServer(): FacebookServer {
        if (!this.facebookServer) {
            this.facebookServer = new FacebookServer(this.getWebserver(), this.getWitService(), this.getConversationService());
        }
        return this.facebookServer;
    }

    getApiEndpoint(): ApiEndpoint {
        if (!this.apiService) {
            this.apiService = new ApiEndpoint(this.getPropertiesService().get('api.ai.access.token'));
        }
        return this.apiService;
    }

    getWitService(): WitService {
        if (!this.witService) {
            this.witService = new WitService(this.getSessionService(), this.getSenderService(), this.getPropertiesService().get('wit.ai.access.token'));
        }
        return this.witService;
    }

    getConversationService(): ConversationService {
        if (!this.conversationService) {
            this.conversationService = new ConversationService(this.getApiEndpoint(), this.getContextService(), this.getBackendStub());
        }
        return this.conversationService;
    }

    getContextService(): ContextService {
        if (!this.contextService) {
            this.contextService = new ContextService();
        }
        return this.contextService;
    }

    getSessionService(): SessionService {
        if (!this.sessionService) {
            this.sessionService = new SessionService();
        }
        return this.sessionService;
    }

    getSenderService(): SenderService {
        if (!this.senderService) {
            this.senderService = new SenderService();
        }
        return this.senderService;
    }

    getPropertiesService(): PropertiesService {
        if (!this.propertiesService) {
            this.propertiesService = new PropertiesService();
        }
        return this.propertiesService;
    }

    getApiAiWebhook(): ApiAiWebhook {
        if (!this.apiAiWebhook) {
            this.apiAiWebhook = new ApiAiWebhook(this.getWebserver(), this.getBackendStub());
        }
        return this.apiAiWebhook;
    }

    getBackendStub(): BackendStub {
        if (!this.backendStub) {
            this.backendStub = new BackendStub();
        }
        return this.backendStub;
    }

    getWebserver(): ExpressServer {
        if (!this.expressServer) {
            this.expressServer = new ExpressServer();
            this.expressServer.start();
        }
        return this.expressServer;
    }
}