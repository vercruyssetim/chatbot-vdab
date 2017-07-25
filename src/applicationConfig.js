import FacebookResource from './resource/facebook.resource';
import WitClient from './ai/wit.client';
import SenderService from './storage/sender.service';
import PropertiesService from './storage/properties.service';
import ExpressServer from './resource/express.server';
import BackendService from './backend/backend.service';
import VindEenJobClient from './backend/vind.een.job.client';
import FilterService from './backend/filters.service';
import ConversationService from './conversation/conversation.service';
import SchedulingService from './reminder/scheduling.service';
import FacebookClient from './resource/facebook.client';
import UserService from './storage/user.service';
import MongoRepository from './db/mongo.repository';
import ApiClient from './ai/api.client';

class ApplicationConfig {

    getFacebookResource() {
        if (!this.facebookServer) {
            this.facebookServer = new FacebookResource(
                this.getExpressserver(),
                this.getWitClient(),
                this.getApiClient(),
                this.getFacebookClient(),
                this.getUserService(),
                this.getConversationService()
            );
        }
        return this.facebookServer;
    }

    getFacebookClient() {
        if (!this.facebookClient) {
            this.facebookClient = new FacebookClient(
                this.getPropertiesService().get('facebook.access.token')
            );
        }
        return this.facebookClient;
    }

    getWitClient() {
        if (!this.witService) {
            this.witService = new WitClient(this.getPropertiesService().get('wit.ai.access.token'));
        }
        return this.witService;
    }

    getApiClient() {
        if (!this.apiService) {
            this.apiService = new ApiClient(this.getPropertiesService().get('api.ai.access.token'));
        }
        return this.apiService;
    }

    getSenderService() {
        if (!this.senderService) {
            this.senderService = new SenderService(this.getFacebookClient());
        }
        return this.senderService;
    }

    getUserService() {
        if (!this.userService) {
            this.userService = new UserService();
        }
        return this.userService;
    }

    getBackendService() {
        if (!this.backendService) {
            this.backendService = new BackendService(
                this.getVindEenJobClient()
            );
        }
        return this.backendService;
    }

    getSchedulingService() {
        if (!this.schedulingService) {
            this.schedulingService = new SchedulingService(this.getScheduleRepository());
        }
        return this.schedulingService;
    }

    getContextRepository() {
        if (!this.contextRepository) {
            this.contextRepository = new MongoRepository('context', this.getPropertiesService().get('mongo.url'));
        }
        return this.contextRepository;
    }

    getScheduleRepository() {
        if(!this.scheduleRepository){
            this.scheduleRepository = new MongoRepository('schedule', this.getPropertiesService().get('mongo.url'));
        }
        return this.scheduleRepository;
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
            this.conversationService = new ConversationService(this.getSenderService(), this.getUserService(), this.getContextRepository());
        }
        return this.conversationService;
    }

    getExpressserver() {
        if (!this.expressServer) {
            this.expressServer = new ExpressServer(
                this.getPropertiesService().get('host.name'),
                this.getPropertiesService().get('port.name')
            );
            this.expressServer.startServer();
        }
        return this.expressServer;
    }
}
const applicationConfig = new ApplicationConfig();
export default applicationConfig;