class MessageService{
    constructor(){
        this.senders = {};
    }

    addSender(sessionId, sender){
        this.senders[sessionId] = sender;
    }

    sendMessage(sessionId, text){
        this.senders[sessionId].reply(text);
    }

    removeSender(sessionId){
        delete this.senders[sessionId];
    }
}
const messageService = new MessageService();
module.exports = messageService;