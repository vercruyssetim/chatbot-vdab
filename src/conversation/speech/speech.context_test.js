import SpeechContext from './speech.context';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
let expect = chai.expect;
chai.use(sinonChai);

describe('Speech context -> ', () => {

    let speechContext, state, data;

    beforeEach(() => {
        speechContext = new SpeechContext();
        state = {
            start: () => {},
            complete: () => {},
            failed: () => {}
        };
        data = {
            data: {}
        };
    });

    describe('start: ', () => {
        it('Will call start method on state', () => {
            sinon.stub(state, 'start');

            speechContext.start(state, data);

            expect(state.start).to.have.been.calledWith(speechContext.speech, data.data);
        });
    });

    describe('complete: ', () => {
        it('Will call complete method on state', () => {
            sinon.stub(state, 'complete');

            speechContext.complete(state, data);

            expect(state.complete).to.have.been.calledWith(speechContext.speech, data.data);
        });
    });

    describe('failed: ', () => {
        it('Will call failed method on state', () => {
            sinon.stub(state, 'failed');

            speechContext.failed(state);

            expect(state.failed).to.have.been.calledWith(speechContext.speech);
        });
    });
});