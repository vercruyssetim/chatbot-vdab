import FacebookResource from './resource/facebook.resource';
import WitClient from './ai/wit.client';
import SessionService from './storage/session.service';
import SenderService from './storage/sender.service';
import PropertiesService from './storage/properties.service';
import ExpressServer from './resource/express.server';
import BackendService from './backend/backend.service';
import VindEenJobClient from './backend/vind.een.job.client';
import FilterService from './backend/filters.service';
import ConversationService from './conversation/conversation.service';

class ApplicationConfig {

    getFacebookResource() {
        if (!this.facebookServer) {
            this.facebookServer = new FacebookResource(this.getExpressserver(), this.getWitClient());
        }
        return this.facebookServer;
    }

    getWitClient() {
        if (!this.witService) {
            this.witService = new WitClient(
                this.getSessionService(),
                this.getSenderService(),
                this.getPropertiesService().get('wit.ai.access.token'),
                this.getBackendService(),
                this.getConversationService()
            );
        }
        return this.witService;
    }

    getSessionService() {
        if (!this.sessionService) {
            this.sessionService = new SessionService();
        }
        return this.sessionService;
    }

    getSenderService() {
        if (!this.senderService) {
            this.senderService = new SenderService();
        }
        return this.senderService;
    }

    getBackendService() {
        if (!this.backendService) {
            this.backendService = new BackendService(
                this.getVindEenJobClient()
            );
        }
        return this.backendService;
    }

    getVindEenJobClient() {
        if (!this.vindEenJobClient) {
            this.vindEenJobClient = new VindEenJobClient();
        }
        return this.vindEenJobClient;
    }

    getPropertiesService() {
        if (!this.propertiesService) {
            this.propertiesService = new PropertiesService();
        }
        return this.propertiesService;
    }

    getFilterService() {
        if (!this.filterService) {
            this.filterService = new FilterService();
        }
        return this.filterService;
    }

    getConversationService() {
        if (!this.conversationService) {
            this.conversationService = new ConversationService(this.getSenderService());
        }
        return this.conversationService;
    }

    getExpressserver() {
        if (!this.expressServer) {
            this.expressServer = new ExpressServer();
            this.expressServer.startServer();
        }
        return this.expressServer;
    }
}
const applicationConfig = new ApplicationConfig();
export default applicationConfig;