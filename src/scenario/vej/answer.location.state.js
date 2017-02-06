import AnswerKeywordState from './answer.keyword.state';

export default class AnswerLocationState {

    saveLocation(reply, {location}){
        reply.addMessage(`Ok, ik noteer ${location}`);
        reply.addMessage('Als wat of bij wie zou je willen werken?');
        reply.send();
        return new AnswerKeywordState();
    }
}
