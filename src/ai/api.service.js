const apiai = require('apiai');

class ApiService {
    constructor(apiai) {
        this.apiai = apiai;
    }

    $onInit() {
        this.app = apiai("a00b99c7210944678bfdabb7bbb29dd6");
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
}

const apiService = new ApiService(apiai);
apiService.$onInit();
module.exports = apiService;

