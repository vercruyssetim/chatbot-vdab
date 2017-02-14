import BackendService from './backend.service';
import chai from 'chai';

let expect = chai.expect;

describe('backend service:', () => {

    let backendService, callBack;
    beforeEach(() => {
        backendService = new BackendService({
            lookupJobs: () => {
                return {
                    then: (callBackFunction) => {
                        callBack = callBackFunction;
                    }
                };
            }
        });
    });

    const asyncCheck = (test, done) => {
        try {
            test();
            done();
        } catch (e) {
            done(e);
        }
    };

    describe('lookupJobs', () => {
        it('will only give back first 6 jobs', (done) => {
            backendService.lookupJobs({sessionId: 1}).then((results) => {
                asyncCheck(() => {
                    expect(results.map((result) => result.title)).to.deep.equal(['1', '2', '3', '4', '5', '6']);
                }, done);
            });

            callBack([
                {id: 1, bedrijf: '1'},
                {id: 2, bedrijf: '2'},
                {id: 3, bedrijf: '3'},
                {id: 4, bedrijf: '4'},
                {id: 5, bedrijf: '5'},
                {id: 6, bedrijf: '6'},
                {id: 7, bedrijf: '7'}
            ]);
        });

        it('will skip already shown jobs', (done) => {
            backendService.lookupJobs({sessionId: 1});

            callBack([
                {id: 1, bedrijf: '1'},
                {id: 2, bedrijf: '2'},
                {id: 3, bedrijf: '3'},
                {id: 4, bedrijf: '4'},
                {id: 5, bedrijf: '5'},
                {id: 6, bedrijf: '6'},
                {id: 7, bedrijf: '7'}
            ]);

            backendService.lookupJobs({sessionId: 1}).then((results) => {
                asyncCheck(() => {
                    expect(results.map((result) => result.title)).to.deep.equal(['7']);
                }, done);
            });

            callBack([
                {id: 1, bedrijf: '1'},
                {id: 2, bedrijf: '2'},
                {id: 3, bedrijf: '3'},
                {id: 4, bedrijf: '4'},
                {id: 5, bedrijf: '5'},
                {id: 6, bedrijf: '6'},
                {id: 7, bedrijf: '7'}
            ]);
        });
    });
});
