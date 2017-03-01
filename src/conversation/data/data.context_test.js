import DataContext from './data.context';
import {expect} from 'chai';

describe('data context -> ', () => {
    let dataContext;

    beforeEach(() => {
        dataContext = new DataContext();
    });

    describe('filter jobs: ', () => {
        it('will filter jobs', () => {
            dataContext.jobIds = [1, 2];
            let actual = dataContext.filterJobs([{id: 2}, {id: 3}]);
            expect(actual).to.deep.equal([{id: 3}]);
        });
    });
});
