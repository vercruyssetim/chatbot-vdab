import FilterService from './filters.service';
import {expect} from 'chai';

describe('filter service:', () => {

    let filterService;

    beforeEach(() => {
        filterService = new FilterService();
    });

    it('will reform filters', () => {
        let filters = filterService.getFilters();
        expect(filters).to.deep.equal({voltijds_deeltijds: 'voltijds of deeltijds', type: 'type', diploma: 'diploma'});
    });
});
