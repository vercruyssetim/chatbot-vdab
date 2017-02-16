import applicationConfig from '../../applicationConfig';
import EndState from '../end.state';
import FilterStartState from './filter.start.state';

export default class AnswerFilterOptionsState {

    constructor() {
        this.backendService = applicationConfig.getBackendService();
        this.filterService = applicationConfig.getFilterService();
        this.schedulingService = applicationConfig.getSchedulingService();
    }

    saveFilterOption(reply, {sessionId, filters, keyword, location}) {
        reply.addMessage(`Ik zoek jobs voor ${keyword} in ${location} gefilterd op ${this.filterService.toString(filters)}`);
        reply.send();
        this.backendService.lookupJobs({sessionId, keyword, location, filters}).then((jobs) => {
            if(jobs.length !== 0){
                reply.addElements(jobs);
                reply.addDelay(3000);
                reply.addQuickReplies('Wil je deze resultaten nog verder filteren?', ['ja, graag!', 'nee, dank je']);
                reply.send();
            } else {
                reply.addMessage('Sorry, ik kan geen resultaten voor deze criteria vinden...');
                reply.send();
            }
        });
        return new EndState(new FilterStartState());
    }
}
