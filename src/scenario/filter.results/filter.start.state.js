import applicationConfig from '../../applicationConfig';
import AnswerFilterState from './answer.fitler.state';

export default class FilterStartState {

    constructor(){
        this.filterService = applicationConfig.getFilterService();
    }

    start(reply){
        reply.addButtons('Waarop wil je filteren?', this.filterService.getFilters());
        reply.send();
        return new AnswerFilterState();
    }
}
