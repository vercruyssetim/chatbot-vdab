import {expect} from 'chai';
import UrlBuilder from './url.builder';

describe('urlBuilder', () => {

    it('build url one query param', () => {
        let urlBuilder = UrlBuilder.aUrl('http://www.google.com')
            .withQueryParam('name', 'value')
            .build();
        expect(urlBuilder).to.equal('http://www.google.com?name=value');
    });


    it('build url two query params', () => {
        let urlBuilder = UrlBuilder.aUrl('http://www.google.com')
            .withQueryParam('name1', 'value1')
            .withQueryParam('name2', 'value2')
            .build();
        expect(urlBuilder).to.equal('http://www.google.com?name1=value1&name2=value2');
    });

    it('build url empty queryparam', () => {
        let urlBuilder = UrlBuilder.aUrl('http://www.google.com')
            .withQueryParam('name1', null)
            .withQueryParam('name2', undefined)
            .build();
        expect(urlBuilder).to.equal('http://www.google.com');
    });
});
