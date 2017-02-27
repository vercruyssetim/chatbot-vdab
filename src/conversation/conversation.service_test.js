import ConversationService from './conversation.service';
import {expect} from 'chai';

describe('ConversationService -> ', () => {

    let conversationService;
    beforeEach(() => {
        conversationService = new ConversationService();
    });

    describe('handleUserAction: ', () => {

        it('will start new maingoal when useraction has initiative', (done) => {
            conversationService.handleUserAction(
                {hasInitiative: true},
                {
                    goal: {
                        startMainGoal: (actualNewMainGoal) => {
                            expect(actualNewMainGoal).to.equal(null);
                        }
                    }
                })
        });
    });
});
