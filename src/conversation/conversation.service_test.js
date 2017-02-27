import ConversationService from './conversation.service';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import GoalContext from './goal/goal.context';
import SpeechContext from './speech/speech.context';
import GoalFactory from './goal/goal.factory';
import DataContext from './data/data.context';
let expect = chai.expect;
chai.use(sinonChai);

describe('ConversationService -> ', () => {

    let conversationService, goal, speech, data, context;
    beforeEach(() => {
        conversationService = new ConversationService();
        goal = new GoalContext();
        speech = new SpeechContext();
        data = new DataContext();
        context = {goal, speech, data};
    });

    describe('handleUserAction: ', () => {

        it('will start new maingoal when useraction has initiative', () => {
            //GIVEN
            sinon.stub(goal, 'startMainGoal');
            sinon.stub(speech, 'start');
            sinon.stub(GoalFactory, 'getNewMainGoal').returns('mainGoal');

            //WHEN
            conversationService.handleUserAction({hasInitiative: true}, context);

            //THEN
            expect(goal.startMainGoal).to.have.been.calledWith('mainGoal');
            expect(speech.start).to.have.been.calledWith('mainGoal', data);
        });

        it('will complete shorttermgoal when useraction doesn\'t have initiative', () => {
            //GIVEN
            sinon.stub(goal, 'hasOpenQuestion').returns(true);
            sinon.stub(goal, 'isShortTermGoalCompletedBy').returns(true);
            sinon.stub(goal, 'getShortTermGoal').returns('shortTermGoal');
            sinon.stub(goal, 'completeShortTermGoal');
            sinon.stub(speech, 'complete');
            sinon.stub(data, 'complete');

            //WHEN
            conversationService.handleUserAction({hasInitiative: false}, context);

            //THEN
            expect(speech.complete).to.have.been.calledWith('shortTermGoal');
            expect(data.complete).to.have.been.calledWith('shortTermGoal');
            expect(goal.completeShortTermGoal).to.have.been.calledOnce;
        });

        it('will fail when no shortterm goal available', () => {
            //GIVEN
            sinon.stub(goal, 'hasOpenQuestion').returns(false);
            sinon.stub(speech, 'error');

            //WHEN
            conversationService.handleUserAction({hasInitiative: false}, context);

            //THEN
            expect(speech.error).to.have.been.calledOnce;
        });

        it('will fail when shortterm goal can not be completed by the useraction', () => {
            //GIVEN
            sinon.stub(goal, 'hasOpenQuestion').returns(true);
            sinon.stub(goal, 'isShortTermGoalCompletedBy').returns(false);
            sinon.stub(goal, 'getShortTermGoal').returns('shortTermGoal');
            sinon.stub(speech, 'failed');

            //WHEN
            conversationService.handleUserAction({hasInitiative: false}, context);

            //THEN
            // expect(speech.failed).to.have.been.calledOnce;
            expect(speech.failed).to.have.been.calledWith('shortTermGoal');
        });
    });


    describe('handleUserAction: ', () => {
        it('Should complete main goal when it can be completed', () => {
            sinon.stub(goal, 'hasMainGoal').returns(true);
            sinon.stub(goal, 'hasOpenQuestion').returns(false);
            sinon.stub(goal, 'isMainGoalCompletedBy').returns(true);
            sinon.stub(goal, 'getMainGoal').returns('mainGoal');
            sinon.stub(goal, 'completeMainGoal');
            sinon.stub(speech, 'complete');
            sinon.stub(data, 'complete');

            conversationService.tryToCompleteMainGoal(context);

            expect(data.complete).to.have.been.calledWith('mainGoal', data);
            expect(speech.complete).to.have.been.calledWith('mainGoal', data);
            expect(goal.completeMainGoal).to.have.been.calledOnce;
        });
    });
});