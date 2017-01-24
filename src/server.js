import './webhook/api.ai.webhook';
import slackServer from './server/slack.server';
import facebookServer from './server/facebook.server';
import propertiesService from './storage/properties.service';

class Server {
    constructor(slackServer, facebookServer, propertiesService) {
        this.slackServer = slackServer;
        this.facebookServer = facebookServer;
        this.propertiesService = propertiesService;
    }

    $onInit() {
        let facebookAccessToken = this.propertiesService.get('facebook.access.token');
        let facebookVerifyToken = this.propertiesService.get('facebook.verify.token');
        let slackVerifyToken = this.propertiesService.get('slack.verify.token');
        let slackClientId = this.propertiesService.get('slack.client.id');
        let slackClientSecret = this.propertiesService.get('slack.client.secret');
        this.slackServer.startServer(slackClientId, slackClientSecret, slackVerifyToken);
        this.facebookServer.startServer(facebookAccessToken, facebookVerifyToken);
    }
}

const server = new Server(slackServer, facebookServer, propertiesService);
server.$onInit();