import applicationConfig from '../applicationConfig';
import ConfirmFilterState from './confirm.filter.state';

export default class SecondQuestionState {

    constructor() {
        this.backendService = applicationConfig.getBackendService();
    }

    saveCompany(reply, {company, location}) {
        reply.addMessage(`Leuk bedrijf ${company}`);
        reply.addMessage(`Ik zoek jobs voor ${company} in ${location}`);
        reply.send();
        this.backendService.lookupJobs({keyword: company, location}).then((jobs) => {
            reply.addElements(jobs);
            reply.addQuickReplies('Wil je deze resultaten nog filteren?', ['ja, graag!', 'nee, dank je']);
            reply.send();
        });
        return new ConfirmFilterState();

    }

    saveProfession(reply, {profession, location}) {
        reply.addMessage(`Goed beroep ${profession}`);
        reply.addMessage(`Ik zoek jobs voor ${profession} in ${location}`);
        reply.send();
        this.backendService.lookupJobs({keyword: profession, location}).then((jobs) => {
            reply.addElements(jobs);
            reply.addQuickReplies('Wil je deze resultaten nog filteren?', ['ja, graag!', 'nee, dank je']);
            reply.send();
        });
        return new ConfirmFilterState();
    }
}
