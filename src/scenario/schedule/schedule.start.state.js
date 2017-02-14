import applicationConfig from '../../applicationConfig';
import EndState from '../end.state';

export default class ScheduleStartState {

    constructor(){
        this.backendService = applicationConfig.getBackendService();
        this.schedulingService = applicationConfig.getSchedulingService();
    }

    start(reply, {sessionId, keyword, location, filters}){
        reply.addMessage('Ik zal je om de zoveel tijd lastigvallen met jobs');
        reply.send();
        this.schedulingService.schedule(sessionId, () => {
            this.backendService.lookupJobs({sessionId, keyword, location, filters}).then((jobs) => {
                if(jobs.length !== 0){
                    reply.addMessage('Kijk eens hier welke jobs ik allemaal voor je gevonden heb!');
                    reply.addElements(jobs);
                    reply.addDelay(3000);
                    reply.send();
                }
            });
        });
        return new EndState();
    }
}
