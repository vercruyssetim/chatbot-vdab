import applicationConfig from '../../../../applicationConfig';
import StartSchedule from './start.schedule';
import {expect} from 'chai';

describe('start schedule -> ', () => {

    let startSchedule;
    beforeEach(() => {
        applicationConfig.propertiesService = {
            get: () => {}
        };
        startSchedule = new StartSchedule({});
    });

    describe('filter jobs: ', () => {
        it('will filter jobs', () => {
            let actual = startSchedule.filterJobs([{id: 2}, {id: 3}], [1, 2]);
            expect(actual).to.deep.equal([{id: 3}]);
        });
    });
});
