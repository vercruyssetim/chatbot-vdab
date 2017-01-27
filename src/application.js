import ApplicationConfig from './applicationConfig';

class Server {
    constructor() {
        let applicationConfig = new ApplicationConfig();
        this.facebookServer = applicationConfig.getFacebookResource();
        this.propertiesService = applicationConfig.getPropertiesService();
    }

    startServer() {
        let facebookAccessToken = this.propertiesService.get('facebook.access.token');
        let facebookVerifyToken = this.propertiesService.get('facebook.verify.token');
        this.facebookServer.startResource(facebookAccessToken, facebookVerifyToken);
    }
}

const server = new Server();
server.startServer();