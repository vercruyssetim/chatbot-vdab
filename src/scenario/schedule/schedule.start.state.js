import applicationConfig from '../../applicationConfig';
import EndState from '../end.state';

export default class ScheduleStartState {

    constructor(){
        this.backendService = applicationConfig.getBackendService();
        this.schedulingService = applicationConfig.getSchedulingService();
    }

    start(reply, {sessionId, keyword, location, filters}){
        reply.addMessage('Vanaf nu zal ik je één keer per dag nieuwe vacatures sturen');
        reply.send();
        this.schedulingService.schedule(sessionId, () => {
            this.backendService.lookupJobs({sessionId, keyword, location, filters}).then((jobs) => {
                if(jobs.length !== 0){
                    reply.addMessage('Hier zijn je dagelijkse jobs!');
                    reply.addElements(jobs);
                    reply.addDelay(3000);
                    reply.send();
                }
            });
        });
        return new EndState();
    }
}
