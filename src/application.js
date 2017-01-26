import ApplicationConfig from './applicationConfig';

class Server {
    constructor() {
        let applicationConfig = new ApplicationConfig();
        applicationConfig.getApiAiWebhook();
        this.slackServer = applicationConfig.getSlackServer();
        this.facebookServer = applicationConfig.getFacebookServer();
        this.propertiesService = applicationConfig.getPropertiesService();
    }

    startServer() {
        console.log('start');
        let facebookAccessToken = this.propertiesService.get('facebook.access.token');
        let facebookVerifyToken = this.propertiesService.get('facebook.verify.token');
        let slackVerifyToken = this.propertiesService.get('slack.verify.token');
        let slackClientId = this.propertiesService.get('slack.client.id');
        let slackClientSecret = this.propertiesService.get('slack.client.secret');
        this.slackServer.startServer(slackClientId, slackClientSecret, slackVerifyToken);
        this.facebookServer.startServer(facebookAccessToken, facebookVerifyToken);
    }
}

const server = new Server();
server.startServer();