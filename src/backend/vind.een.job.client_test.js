import {expect} from 'chai';
import VindEenJobClient from './vind.een.job.client';

describe('vind een job client: ', () => {

    it('kan gegevens ophalen', () => {
        let vindEenJobClient = new VindEenJobClient();
        vindEenJobClient.lookupJobs('blanden', 'bakker').then((result) => {
            expect(result.length).to.have.length.of.at.least(1);
        });
    });
});
