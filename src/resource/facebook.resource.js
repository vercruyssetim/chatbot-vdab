import Botkit from 'botkit';

export default class FacebookResource {

    constructor(webserver, witService, facebookClient, userService) {
        this.webserver = webserver;
        this.witService = witService;
        this.facebookClient = facebookClient;
        this.userService = userService;
    }

    startResource(accessToken, verifyToken) {
        let controller = Botkit.facebookbot({
            verify_token: verifyToken,
            access_token: accessToken,
            json_file_store: './storage',
            port: '3000',
            hostname: '0.0.0.0'
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
        console.log(`Receiving... ${JSON.stringify(message.text)}`);
        this.saveUser(message.user);
        this.witService.handleMessageReceived(message.text, message.user, (reply) => {
            console.log(`Sending... ${JSON.stringify(reply)}`);
            bot.reply(message, FacebookResource.mapToFacebookResponse(reply));
        });
    }

    saveUser(userId){
        if(!this.userService.getUser(userId)){
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
        } else if(reply.image) {
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
                title: reply,
                payload: reply
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
