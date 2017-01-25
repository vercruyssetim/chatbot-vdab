import {ApplicationConfig} from "./applicationConfig";
import {SlackServer} from "./server/slack.server";
import {FacebookServer} from "./server/facebook.server";
import {PropertiesService} from "./storage/properties.service";

class Application {
    private applicationConfig: ApplicationConfig = new ApplicationConfig();
    private slackServer: SlackServer;
    private facebookServer: FacebookServer;
    private propertiesService: PropertiesService;

    constructor(){
        this.applicationConfig.getApiAiWebhook();
        this.propertiesService = this.applicationConfig.getPropertiesService();
        this.slackServer = this.applicationConfig.getSlackServer();
        this.facebookServer = this.applicationConfig.getFacebookServer();
    }

    start() {
        let facebookAccessToken = this.propertiesService.get('facebook.access.token');
        let facebookVerifyToken = this.propertiesService.get('facebook.verify.token');
        let slackVerifyToken = this.propertiesService.get('slack.verify.token');
        let slackClientId = this.propertiesService.get('slack.client.id');
        let slackClientSecret = this.propertiesService.get('slack.client.secret');
        this.slackServer.startServer(slackClientId, slackClientSecret);
        this.facebookServer.startServer(facebookAccessToken, facebookVerifyToken);
    }
}
const application = new Application();
application.start();

