const apiai = require('apiai');
const webserver = require('../server/web.server');

class ApiService {
    constructor(apiai, webserver) {
        this.apiai = apiai;
        this.webserver = webserver;
    }

    $onInit() {
        this.app = apiai("a00b99c7210944678bfdabb7bbb29dd6");
        this.initWebhook(this.webserver);
    }

    sendRequest(text, sessionId, sender) {
        let request = this.app.textRequest(text, {
            sessionId: sessionId
        });
        request.on('response', (response) => {
            let text = response.result.fulfillment.speech;
            sender(text);
            console.log(`sending from api... ${text}`);
        });
        request.on('error', (error) => {
            console.log(error);
        });
        request.end();
    }

    initWebhook(webserver) {
        webserver.server.post('/api/webhook', (req, res) => {
            let action = req.body.result.action;
            let parameters = req.body.result.parameters;

            if(action === 'getForecast'){
                let location = parameters['geo-capital'];
                let message = `The weather will be sunny in ${location}`;
                res.send({
                    "speech": message,
                    "displayText": message,
                    "source": "apiai-weather-webhook-sample"
                })
            } else {
                res.send({
                    "speech": 'I\'m gonna help you!',
                    "displayText": 'I\'m gonna help you!',
                    "source": "apiai-weather-webhook-sample"
                });
            }
        })
    }
}

const apiService = new ApiService(apiai, webserver);
apiService.$onInit();
module.exports = apiService;

