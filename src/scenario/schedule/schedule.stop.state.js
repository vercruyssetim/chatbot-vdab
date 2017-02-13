import applicationConfig from '../../applicationConfig';
import EndState from '../end.state';

export default class ScheduleStopState {

    constructor(){
        this.schedulingService = applicationConfig.getSchedulingService();
    }

    start(reply, {sessionId}){
        reply.addMessage('Ik zal je niet meer lastigvallen');
        reply.send();
        this.schedulingService.stop(sessionId);
        return new EndState();
    }
}

