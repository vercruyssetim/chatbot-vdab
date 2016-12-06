class SenderService{
    constructor(){
        this.senders = {};
    }

    addSender(sessionId, sender){
        this.senders[sessionId] = sender;
    }

    sendMessage(sessionId, text){
        this.senders[sessionId](text);
    }

    removeSender(sessionId){
        delete this.senders[sessionId];
    }
}
const senderService = new SenderService();
module.exports = senderService;