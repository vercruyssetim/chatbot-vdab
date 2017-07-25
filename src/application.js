import applicationConfig from './applicationConfig';

class Server {
    constructor() {
        let config = applicationConfig;
        this.facebookServer = config.getFacebookResource();
        this.propertiesService = config.getPropertiesService();
    }

    startServer() {
        let facebookVerifyToken = this.propertiesService.get('facebook.verify.token');
        this.facebookServer.startResource(facebookVerifyToken);
        console.log('Application started!!');
    }
}

const server = new Server();
server.startServer();