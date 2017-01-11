const webserver = require('../server/web.server');
const backendService = require('../backend/backend.stub');

class ApiAiWebhook{
    constructor(webserver, backendService){
        this.webserver = webserver;
        this.backendService = backendService;
        this.handlers = {};
    }

    $onInit(){
        this.initWebhook();
        this.handlers['get.username'] = (req, res) => this.handleGetUsername(req, res);
        this.handlers['list.answers'] = (req, res) => this.handleListAnswers(req, res);
    }

    initWebhook(){
        this.webserver.server.post('/api/webhook', (req, res) => {
            let action = req.body.result.action;
            if(this.handlers[action]){
                this.handlers[action](req, res);
            }
        });
        console.log('info: ** /api/webhook started');
    }

    handleGetUsername(req, res){
        let message = this.getUsernameMessage(req);
        res.send({
            "speech": message,
            "displayText": message,
            "source": "apiai-webhook"
        })
    }

    handleListAnswers(req, res){
        let message = this.getListAnswers(req);
        res.send({
            "speech": message,
            "displayText": message,
            "source": "apiai-webhook-bla"
        })
    }

    getListAnswers(req){
        let answersToString = this.backendService.answersToString(req.body.sessionId, 'orientation');
        if(answersToString){
            return answersToString.join();
        } else {
            return 'Nothing';
        }
    }

    getUsernameMessage(req){
        let username = this.backendService.getUsername(req.body.sessionId);
        if(username){
            return `your username is ${username}`;
        }
        return `I don't know your username yet`;
    }

}
const apiAiWebhook = new ApiAiWebhook(webserver, backendService);
apiAiWebhook.$onInit();
module.exports = apiAiWebhook;
