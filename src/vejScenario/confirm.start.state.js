import EersteVraagState from './eerste.vraag.state';
import EndState from './end.state';

export default class ConfirmStartState {

    positive(reply){
        reply.addMessage('Super!');
        reply.addMessage('Eerste vraag: Waar in Vlaanderen zou je willen werken?');
        reply.send();
        return new EersteVraagState();
    }

    negative(reply){
        reply.addMessage('Jammer, tot de volgende keer!');
        reply.send();
        return new EndState();
    }

}
