import ConfirmFilterState from './confirm.filter.state';
import applicationConfig from '../../applicationConfig';

export default class AnswerFilterOptionsState {

    constructor() {
        this.backendService = applicationConfig.getBackendService();
        this.filterService = applicationConfig.getFilterService();
    }

    saveFilterOption(reply, {filters, keyword, location}) {
        reply.addMessage(`Ik zoek jobs voor ${keyword} in ${location} gefilterd op ${this.filterService.toString(filters)}`);
        reply.send();
        this.backendService.lookupJobs({keyword, location, filters}).then((jobs) => {
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
        return new ConfirmFilterState();
    }
}
