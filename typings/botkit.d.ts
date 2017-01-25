export as namespace botKitLib;

export = Botkit;

declare class Botkit {
    slackbot(config: any): Botkit.Slackbot;
    facebookbot(config: any): Botkit.Facebookbot;

}

declare namespace Botkit {
    export interface Slackbot{
        createWebhookEndpoints(webserver: any)
        createOauthEndpoints(webserver: any)
        hears(regex: string, types: string, callback: (bot: any, message: any) => void)
    }

    export interface Facebookbot{
        createWebhookEndpoints(webserver: any)
        createOauthEndpoints(webserver: any)
        hears(regex: string, types: string, callback: (bot: any, message: any) => void)
    }
}