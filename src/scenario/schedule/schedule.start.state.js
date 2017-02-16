import applicationConfig from '../../applicationConfig';
import EndState from '../end.state';

export default class ScheduleStartState {

    constructor(){
        this.backendService = applicationConfig.getBackendService();
        this.schedulingService = applicationConfig.getSchedulingService();
    }

    start(reply, {sessionId, keyword, location, filters}){
        reply.addMessage('Vanaf nu zal ik één keer per minuut zal ik je nieuwe vacatures sturen');
        reply.send();
        this.schedulingService.schedule(sessionId, () => {
            this.backendService.lookupJobs({sessionId, keyword, location, filters}).then((jobs) => {
                if(jobs.length !== 0){
                    reply.addMessage('Hier je minuutelijke jobs!');
                    reply.addElements(jobs);
                    reply.addDelay(3000);
                    reply.send();
                }
            });
        });
        return new EndState();
    }
}
