import applicationConfig from './applicationConfig';

class Server {
    constructor() {
        let config = applicationConfig;
        this.facebookServer = config.getFacebookResource();
        this.propertiesService = config.getPropertiesService();
    }

    startServer() {
        let facebookAccessToken = this.propertiesService.get('facebook.access.token');
        let facebookVerifyToken = this.propertiesService.get('facebook.verify.token');
        this.facebookServer.startResource(facebookAccessToken, facebookVerifyToken);
        console.log('Application started!!');
    }
}

const server = new Server();
server.startServer();