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

    addGreeting() {
        return new Promise((resolve, error) => {
            request.post(`https://graph.facebook.com/v2.6/me/thread_settings?access_token=${this.accessToken}`,
                {
                    form: {
                        setting_type: 'greeting',
                        greeting: {
                            text: 'hallo {{user_full_name}} welkom bij de chatbot van de vdab.'
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
                                title: 'Start herinneringen',
                                payload: 'Kan ik herinneringen inplannen?'
                            },
                            {
                                type: 'postback',
                                title: 'Stop herinneringen',
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
