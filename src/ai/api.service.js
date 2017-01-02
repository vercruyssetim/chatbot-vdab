const apiai = require('apiai');
const webserver = require('../server/web.server');
const propertiesService = require('../storage/properties.service');

class ApiService {
    constructor(apiai, webserver, propertiesService) {
        this.apiai = apiai;
        this.webserver = webserver;
        this.propertiesService = propertiesService;
    }

    $onInit() {
        this.app = apiai(this.propertiesService.get('api.ai.access.token'));
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

const apiService = new ApiService(apiai, webserver, propertiesService);
apiService.$onInit();
module.exports = apiService;

