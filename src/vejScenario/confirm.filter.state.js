import applicationConfig from '../applicationConfig';
import EndState from './end.state';

export default class ConfirmFilterState {
    constructor(){
        this.filterService = applicationConfig.getFilterService();
    }

    positive(reply){
        reply.addButtons('Kies een filter', this.filterService.getFilters());
        reply.send();
        return new EndState();
    }

    negative(reply){
        reply.addMessage('Jammer, tot de volgende');
        reply.send();
        return new EndState();
    }
}
