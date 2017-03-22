import Botkit from 'botkit';

export default class FacebookResource {

    constructor(webserver, witService, facebookClient, userService, hostName, portName) {
        this.webserver = webserver;
        this.witService = witService;
        this.facebookClient = facebookClient;
        this.userService = userService;
        this.hostName = hostName;
        this.portName = portName;
    }

    startResource(accessToken, verifyToken) {
        let controller = Botkit.facebookbot({
            verify_token: verifyToken,
            access_token: accessToken,
            json_file_store: './storage',
            port: this.portName,
            hostname: this.hostName
        });
        let bot = controller.spawn({});

        this.facebookClient.addMenu();
        this.facebookClient.addGreeting();
        this.facebookClient.login().then(() => {
            controller.startTicking();
        });

        controller.createWebhookEndpoints(this.webserver.server, bot);
        controller.hears(['(.*)'], 'message_received', (bot, message) => this.handleMessageReceived(bot, message));
    }

    handleMessageReceived(bot, message) {
        let text = this.extractText(message);
        console.log(`Receiving... ${JSON.stringify(text)}`);
        this.saveUser(message.user);
        this.witService.handleMessageReceived(text, message.user, (reply) => {
            console.log(`Sending... ${JSON.stringify(reply)}`);
            bot.reply(message, FacebookResource.mapToFacebookResponse(reply));
        });
    }

    extractText(message) {
        return message.quick_reply ? message.quick_reply.payload : message.text;
    }

    saveUser(userId) {
        if (!this.userService.getUser(userId)) {
            this.facebookClient.getUser(userId).then((user) => {
                this.userService.setUser(userId, user);
            });
        }
    }

    static mapToFacebookResponse(reply) {
        if (reply.elements) {
            return {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: FacebookResource.mapListToElements(reply.elements)
                    }
                }
            };
        } else if (reply.quickreplies) {
            return {
                text: reply.text,
                quick_replies: FacebookResource.mapToQuickReplies(reply.quickreplies)
            };
        } else if (reply.buttons) {
            return {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'button',
                        text: reply.text,
                        buttons: FacebookResource.mapToButtons(reply.buttons)
                    }
                }
            };
        } else if (reply.image) {
            return {
                attachment: {
                    type: 'image',
                    payload: {
                        url: reply.image
                    }
                }
            };
        } else {
            return {
                text: reply.text
            };
        }
    }

    static mapListToElements(list) {
        return list.map((element) => {
            return {
                title: element.title,
                subtitle: element.subtitle,
                item_url: element.link,
                image_url: element.image,
                buttons: [{
                    type: 'web_url',
                    url: element.link,
                    title: 'Open link naar vacature'
                }]
            };
        });
    }

    static mapToQuickReplies(quickReplies) {
        return quickReplies.map((reply) => {
            return {
                content_type: 'text',
                title: typeof reply === 'string' ? reply : reply.label,
                payload: typeof reply === 'string' ? reply : reply.value
            };
        });
    }

    static mapToButtons(buttons) {
        let result = [];
        Object.keys(buttons).forEach((key) => {
            result.push({
                type: 'postback',
                title: buttons[key],
                payload: key
            });
        });
        return result;
    }
}
