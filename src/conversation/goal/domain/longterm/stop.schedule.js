import applicationConfig from '../../../../applicationConfig';

export default class StopSchedule {

    constructor() {
        this.schedulingService = applicationConfig.getSchedulingService();
    }

    complete(speech, {sessionId}) {
        speech.addMessage('Ik zal je geen jobs meer sturen');
        speech.send();
        this.schedulingService.stop(sessionId);
    }
}
