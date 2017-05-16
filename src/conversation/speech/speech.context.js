export default class SpeechContext {

    constructor(sessionId, senderService) {
        this.speech = {
            addMessage: (message) => senderService.addMessage(sessionId, message),
            addQuickReplies: (message, quickreplies) => senderService.addQuickReplies(sessionId, message, quickreplies),
            addElements: (elements) => senderService.addElements(sessionId, elements),
            addButtons: (message, buttons) => senderService.addButtons(sessionId, message, buttons),
            addDelay: (stub) => senderService.addDelay(sessionId, stub),
            addImage: (image) => senderService.addImage(sessionId, image),
            send: () => senderService.send(sessionId)
        };
    }

    start(state, data) {
        if(state.start){
            state.start(this.speech, data.data);
        }
    }

    complete(state, data) {
        if(state.complete){
            state.complete(this.speech, data.data);
        }
    }

    error() {
        this.speech.addMessage('Sorry, ik begrijp niet goed wat je bedoelt');
        this.speech.send();
    }

    failed(state) {
        state.failed(this.speech);
    }
}
