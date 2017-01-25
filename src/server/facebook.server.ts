import * as Botkit from "botkit";
import {WitService} from "../ai/wit.service";
import {ConversationService} from "../conversation/conversation.service";
import * as request from "request";
import {FacebookResponse} from "./FacebookResponse";
import {ExpressServer} from "./web.server";

export class FacebookServer {
    private webserver: ExpressServer;
    private witService : WitService;
    private conversationService;

    constructor(webserver: ExpressServer, witService: WitService, conversationService: ConversationService) {
        this.webserver = webserver;
        this.witService = witService;
        this.conversationService = conversationService;
    }

    startServer(accessToken, verifyToken) {
        let controller = Botkit.facebookbot({
            verify_token: verifyToken,
            access_token: accessToken,
            json_file_store: './storage',
            port: '3000',
            hostname: 'localhost'
        });
        let bot = controller.spawn({});

        this.login(accessToken, () => {
            controller.startTicking();
        });
        controller.createWebhookEndpoints(this.webserver.getServer(), bot);

        controller.hears(['(.*)'], 'message_received', (bot, message) => {
            this.conversationService.handleRequest({text: message.text, userId: message.user}, (reply) => {
                let response = new FacebookResponse();
                response.text = reply.text;
                if (reply.quickReplies) {
                    response.quick_replies = FacebookServer.mapToQuickReplies(reply.quickReplies);
                }
                bot.reply(message, response);
            });
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

    login(access_token, callBack) {
        request.post('https://graph.facebook.com/me/subscribed_apps?access_token=' + access_token,
            (err, res, body) => {
                if (err) {
                    console.log('Could not subscribe to page messages');
                } else {
                    console.log('Successfully subscribed to Facebook events:', body);
                    callBack();
                }
            });
        return this;
    }
}
