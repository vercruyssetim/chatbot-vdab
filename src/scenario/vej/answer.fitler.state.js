import applicationConfig from '../../applicationConfig';
import AnswerFilterOptionsState from './answer.filter.options.state';

export default class AnswerFilterState {

    constructor(){
        this.filterService = applicationConfig.getFilterService();
    }

    saveFilter(reply, context){
        reply.addButtons(`Kies een optie voor ${context.filter}`, this.filterService.getFilterOptions(context.filter));
        reply.send();
        return new AnswerFilterOptionsState();
    }
}
