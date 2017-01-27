import FacebookResource from './server/facebook.resource';
import WitClient from './ai/wit.client';
import SessionService from './storage/session.repository';
import SenderService from './storage/sender.service';
import PropertiesService from './storage/properties.service';
import ExpressServer from './server/express.server';

export default class ApplicationConfig {

    getFacebookResource() {
        if (!this.facebookServer) {
            this.facebookServer = new FacebookResource(this.getExpressserver(), this.getWitClient());
        }
        return this.facebookServer;
    }

    getWitClient() {
        if (!this.witService) {
            this.witService = new WitClient(this.getSessionService(), this.getSenderService(), this.getPropertiesService().get('wit.ai.access.token'));
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

    getPropertiesService() {
        if (!this.propertiesService) {
            this.propertiesService = new PropertiesService();
        }
        return this.propertiesService;
    }

    getExpressserver() {
        if (!this.expressServer) {
            this.expressServer = new ExpressServer();
            this.expressServer.startServer();
        }
        return this.expressServer;
    }
}