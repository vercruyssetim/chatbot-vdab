import SecondQuestionState from './second.question.state';

export default class EersteVraagState {

    saveLocation(reply, {location}){
        reply.addMessage(`Fijn! Ik werk graag in ${location}`);
        reply.addMessage('Tweede vraag: Als wat of bij wie zou je willen werken?');
        reply.send();
        return new SecondQuestionState();
    }
}
