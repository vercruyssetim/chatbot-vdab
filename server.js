const slackServer = require('./src/server/slack.server');

class Server {
    constructor(slackServer, process) {
        this.slackServer = slackServer;
        this.process = process;
    }

    $onInit() {
        this.slackServer.startServer(this.process.env.PORT || 3000, this.process.env.SLACK_VERIFY_TOKEN);
    }
}

const server = new Server(slackServer, process);
server.$onInit();