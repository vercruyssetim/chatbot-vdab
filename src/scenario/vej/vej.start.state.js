import AnswerLocationState from './answer.location.state';

export default class VEJStartState {

    start(reply){
        reply.addMessage('Laten we een vacature voor je zoeken!');
        reply.addMessage('Waar in Vlaanderen zou je willen werken?');
        reply.send();
        return new AnswerLocationState();
    }
}
