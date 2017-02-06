import applicationConfig from '../../applicationConfig';
import AnswerFilterState from './answer.fitler.state';

export default class ConfirmFilterState {
    constructor(){
        this.filterService = applicationConfig.getFilterService();
    }

    positive(reply){
        reply.addButtons('Waarop wil je filteren?', this.filterService.getFilters());
        reply.send();
        return new AnswerFilterState();
    }

    negative(reply){
        reply.addMessage('Ok, is er nog iets anders dat ik voor je kan doen?');
        reply.send();
    }
}
