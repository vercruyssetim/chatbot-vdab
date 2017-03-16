import StartSchedule from './start.schedule';
import {expect} from 'chai';

describe('start schedule -> ', () => {

    let startSchedule;
    beforeEach(() => {
        startSchedule = new StartSchedule({});
    });

    describe('filter jobs: ', () => {
        it('will filter jobs', () => {
            let actual = startSchedule.filterJobs([{id: 2}, {id: 3}], {jobIds: [1, 2]});
            expect(actual).to.deep.equal([{id: 3}]);
        });
    });
});
