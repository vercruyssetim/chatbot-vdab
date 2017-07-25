export default class FacebookResource {

    constructor(webserver, witService, apiClient, facebookClient, userService, conversationService) {
        this.webserver = webserver;
        this.witService = witService;
        this.apiClient = apiClient;
        this.facebookClient = facebookClient;
        this.userService = userService;
        this.conversationService = conversationService;
    }

    startResource(verifyToken) {
        this.webserver.server.get('/facebook/receive', (req, res) => this.handleFacebookConnectionRequest(req, res, verifyToken));
        this.webserver.server.post('/facebook/receive', (req, res) => this.handleIncomingMessage(req, res));
        console.log('** Serving webhook endpoints for Messenger Platform at: facebook/receive');

        this.facebookClient.addMenu();
        this.facebookClient.addGreeting();
        this.facebookClient.login();

    }

    handleFacebookConnectionRequest(req, res, verifyToken) {
        console.log(req.query);
        if (req.query['hub.mode'] === 'subscribe') {
            if (req.query['hub.verify_token'] === verifyToken) {
                res.send(req.query['hub.challenge']);
            } else {
                res.send('OK');
            }
        }
    }

    handleIncomingMessage(req, res) {
        if (req.body.entry) {
            for (let entry of req.body.entry) {
                for (let facebook_message of entry.messaging) {
                    this.handleMessageReceived({
                        text: this.mapToText(facebook_message),
                        user: facebook_message.sender.id
                    });
                }
            }
        }
        res.send('ok');
    }

    mapToText(facebook_message) {
        if (facebook_message.message) {
            if (facebook_message.message.quick_reply) {
                return facebook_message.message.quick_reply.payload;
            } else
                return facebook_message.message.text;
        } else if (facebook_message.postback) {
            return facebook_message.postback.payload;
        }
    }

    handleMessageReceived({text, user}) {
        console.log(`Receiving... ${JSON.stringify(text)}`);

        this.saveUser(user);

        this.witService.handleMessageReceived(text, user)
            .then((data) => this.conversationService.getResponse(data, user))
            .catch(console.error);

        this.apiClient.sendQuery(text, user)
            .then((data) => console.log(`From api : ${JSON.stringify(data)}`))
            .catch(console.error);
    }

    saveUser(userId) {
        if (!this.userService.getUser(userId)) {
            this.facebookClient.getUser(userId).then((user) => {
                this.userService.setUser(userId, user);
            });
        }
    }


}
