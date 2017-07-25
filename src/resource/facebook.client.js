import request from 'request';
import User from '../storage/user';

export default class FacebookClient {

    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    login() {
        return new Promise((resolve, error) => {
            request.post(`https://graph.facebook.com/me/subscribed_apps?access_token=${this.accessToken}`,
                (err, res, body) => {
                    if (!err && res.statusCode === 200) {
                        console.log('Successfully subscribed to Facebook events:', body);
                        resolve();
                    } else {
                        console.log('Could not subscribe to page messages');
                        error(err);
                    }
                });
        });
    }

    sendMessage(userId, message) {
        return new Promise((resolve, error) => {
            const options = {
                method: 'post',
                body: {
                    recipient: {
                        id: userId
                    },
                    message: FacebookClient.mapToFacebookResponse(message)
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                json: true,
                url: `https://graph.facebook.com/v2.6/me/messages?access_token=${this.accessToken}`
            };
            request(options,
                (err, result) => {
                    if (!err && result.statusCode === 200) {
                        resolve();
                    } else {
                        console.log(`Could not send message ${result.statusCode}`);
                        error(err);
                    }
                }
            );
        });
    }

    static mapToFacebookResponse(reply) {
        if (reply.elements) {
            return {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'generic',
                        elements: FacebookClient.mapListToElements(reply.elements)
                    }
                }
            };
        } else if (reply.quickreplies) {
            return {
                text: reply.text,
                quick_replies: FacebookClient.mapToQuickReplies(reply.quickreplies)
            };
        } else if (reply.buttons) {
            return {
                attachment: {
                    type: 'template',
                    payload: {
                        template_type: 'button',
                        text: reply.text,
                        buttons: FacebookClient.mapToButtons(reply.buttons)
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
                title: reply.label.length > 20 ? reply.label.substring(0, 16) + '...' : reply.label,
                payload: reply.value
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

    addGreeting() {
        return new Promise((resolve, error) => {
            request.post(`https://graph.facebook.com/v2.6/me/thread_settings?access_token=${this.accessToken}`,
                {
                    form: {
                        setting_type: 'greeting',
                        greeting: {
                            text: 'Hallo {{user_full_name}}, welkom bij de chatbot van VDAB'
                        }
                    }
                },
                (err, res, body) => {
                    if (!err && res.statusCode === 200) {
                        console.log('Successfully set Facebook settings:', body);
                        resolve();
                    } else {
                        console.log('Could not set setting to page messages');
                        error(err);
                    }
                });
        });
    }

    addMenu() {
        return new Promise((resolve, error) => {
            request.post(`https://graph.facebook.com/v2.6/me/thread_settings?access_token=${this.accessToken}`,
                {
                    form: {
                        setting_type: 'call_to_actions',
                        thread_state: 'existing_thread',
                        call_to_actions: [
                            {
                                type: 'web_url',
                                title: 'Website van de vdab',
                                url: 'http://www.vdab.be'
                            },
                            {
                                type: 'postback',
                                title: 'Start',
                                payload: 'Hallo'
                            },
                            {
                                type: 'postback',
                                title: 'Filteren',
                                payload: 'Kan ik op iets anders filteren?'
                            },
                            {
                                type: 'postback',
                                title: 'Start dagelijkse herinneringen',
                                payload: 'Kan ik herinneringen inplannen?'
                            },
                            {
                                type: 'postback',
                                title: 'Stop dagelijkse herinneringen',
                                payload: 'kan je me geen berichten meer sturen?'
                            }
                        ]
                    }
                },
                (err, res, body) => {
                    if (!err && res.statusCode === 200) {
                        console.log('Successfully set Facebook settings:', body);
                        resolve();
                    } else {
                        console.log('Could not set setting to page menu');
                        error(err);
                    }
                });
        });
    }

    getUser(user) {
        return new Promise((resolve, error) => {
            request.get(`https://graph.facebook.com/v2.6/${user}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${this.accessToken}`,
                (err, res, body) => {
                    if (!err && res.statusCode === 200) {
                        let user = JSON.parse(body);
                        resolve(User.aUser()
                            .withFirstName(user.first_name)
                            .withLastName(user.last_name)
                            .withProfilePicture(user.profile_pic)
                            .withGender(user.gender));
                    } else {
                        console.log(`could not fetch user from facebook ${JSON.stringify(res)}`);
                        error(err);
                    }
                });
        });

    }
}
