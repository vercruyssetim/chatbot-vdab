import FilterService from './filters.service';
import {expect} from 'chai';

describe('filter service:', () => {

    let filterService;

    beforeEach(() => {
        filterService = new FilterService();
    });
    describe('getFilters', () => {

        it('will give simpel key -> label list', () => {
            let filters = filterService.getFilters();
            expect(filters).to.deep.equal({
                voltijds_deeltijds: 'voltijds/deeltijds',
                type: 'type',
                diploma: 'diploma'
            });
        });
    });

    describe('getLabel', () => {

        it('will give the label for the key', () => {
            let label = filterService.getLabel('voltijds_deeltijds');
            expect(label).to.be.equal('voltijds/deeltijds');
        });
    });

    describe('toString', () => {

        it('will give a human readable overview of a filter object', () => {
            let filters = {
                voltijds_deeltijds: 'voltijds',
                type: 'interim',
                diploma: 'master'
            };

            let string = filterService.toString(filters);
            expect(string).to.equal('voltijds/deeltijds: voltijds, type: interim en diploma: master');
        });
    });
});
