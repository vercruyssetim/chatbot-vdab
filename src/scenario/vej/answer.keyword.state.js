import applicationConfig from '../../applicationConfig';
import ConfirmFilterState from './confirm.filter.state';

export default class AnswerKeywordState {

    constructor() {
        this.backendService = applicationConfig.getBackendService();
    }

    saveKeyword(reply, {keyword, location}) {
        reply.addMessage(`Ik zoek jobs voor ${keyword} in ${location}`);
        reply.send();
        this.backendService.lookupJobs({keyword, location}).then((jobs) => {
            if (jobs) {
                reply.addElements(jobs);
                reply.addDelay(3000);
                reply.addQuickReplies('Wil je deze resultaten nog filteren?', ['ja, graag!', 'nee, dank je']);
                reply.send();
            } else {
                reply.addMessage('Sorry, ik kan geen resultaten voor deze criteria vinden...');
                reply.send();
            }
        });
        return new ConfirmFilterState();
    }

}
