import GoalEngine from './goal.engine';
import {expect} from 'chai';

describe('goal engine: ', () => {

    let goalEngine;
    beforeEach(() => {
        goalEngine = new GoalEngine();
    });

    describe('handleUserAction: ', () => {

        let context;
        beforeEach(() => {
            context = {
                goal: {
                    mainGoal: {
                        name: () => 'mainGoal'
                    },
                    currentGoal: {
                        name: () => 'currentGoal',
                        isFullFilledByAction: (type) => type === 'type'
                    }
                },
                data: {}
            };
        });

        describe('Given iniative', () => {
            it('will select new goal', () => {
                let failed = goalEngine.handleUserAction(context, {
                    type: 'welcome',
                    hasInitiative: true
                });
                expect(failed).to.equal('success');
                expect(context.goal.mainGoal.name()).to.equal('welcome');
            });
        });

        describe('Given no initiative', () => {
            it('will fullfill previous action', () => {
                let failed = goalEngine.handleUserAction(context, {
                    type: 'type',
                    value: 'value',
                    hasInitiative: false
                });
                expect(failed).to.equal('success');
                expect(context.goal.mainGoal.name()).to.equal('mainGoal');
                expect(context.data.currentGoal).to.equal('value');
            });

            it('will fail with previousaction name if not fullfillable', () => {
                let failed = goalEngine.handleUserAction(context, {
                    type: 'otherType',
                    value: 'value',
                    hasInitiative: false
                });
                expect(failed).to.equal('failed_currentGoal');
                expect(context.goal.mainGoal.name()).to.equal('mainGoal');
                expect(context.data.currentGoal).to.equal(undefined);
            });

            it('will fail if no currentGoal', () => {
                context.goal.currentGoal = null;
                let failed = goalEngine.handleUserAction(context, {
                    type: 'type',
                    value: 'value',
                    hasInitiative: false
                });
                expect(failed).to.equal('error_no_goal');
                expect(context.goal.mainGoal.name()).to.equal('mainGoal');
                expect(context.data.currentGoal).to.equal(undefined);
            });
        });

    });

    describe('calculateNextGoal', () => {
        it('When no prerequisites return maingoal', () => {
            const mainGoal = {
                name: () => 'mainGoal',
                getPrerequisites: () => []
            };
            let nextGoal = goalEngine.calculateNextGoal(mainGoal, {});
            expect(nextGoal.name()).to.equal('mainGoal');
        });

        it('Will return first unfillfilled prerequisited', () => {
            const mainGoal = {
                name: () => 'mainGoal',
                getPrerequisites: () => [{
                    name: () => 'subGoal',
                    isFullFilled: () => false
                }]
            };
            let nextGoal = goalEngine.calculateNextGoal(mainGoal, {});
            expect(nextGoal.name()).to.equal('subGoal');
        });
    });
});
