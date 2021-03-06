import applicationConfig from '../../../../applicationConfig';

export default class StopSchedule {

    constructor() {
        this.schedulingService = applicationConfig.getSchedulingService();
        this.shorttermGoals = [];
        this.name = 'stopSchedule';
    }

    start() {

    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    complete(speech, {sessionId}) {
        speech.addMessage('Ik zal je geen jobs meer sturen');
        speech.send();
        this.schedulingService.stop(sessionId);
    }
}
