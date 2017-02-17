export default class SenderService {

    constructor() {
        this.senders = {};
        this.calls = {};
        this.delay = 300;
    }

    addSender(sessionId, sender) {
        this.senders[sessionId] = sender;
    }

    removeSender(sessionId) {
        delete this.senders[sessionId];
    }

    addMessage(sessionId, text) {
        this.addCall(sessionId, {text});
    }

    addElements(sessionId, elements) {
        this.addCall(sessionId, {elements});
    }

    addQuickReplies(sessionId, text, quickreplies) {
        this.addCall(sessionId, {text, quickreplies});
    }

    addButtons(sessionId, text, buttons) {
        this.addCall(sessionId, {text, buttons});
    }

    addImage(sessionId, image) {
        this.addCall(sessionId, {image});
    }

    addDelay(sessionId, delay) {
        for (let i = 1; i * this.delay < delay; i++) {
            this.addCall(sessionId, {delay: true});
        }
    }

    addCall(sessionId, call) {
        if (!this.calls[sessionId]) {
            this.calls[sessionId] = [];
        }
        this.calls[sessionId].push(call);
    }

    send(sessionId) {
        let interval = setInterval(() => {
            if (this.calls[sessionId].length === 0) {
                clearInterval(interval);
            } else {
                let call = this.calls[sessionId].splice(0, 1)[0];
                if (!call.delay) {
                    this.senders[sessionId](call);
                }
            }
        }, this.delay);

    }


}