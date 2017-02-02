import request from 'request';
import UrlBuilder from './url.builder';
import Promise from 'Promise';
import Vacature from './vacature';

const URL = 'https://www.vdab.be/api/vindeenjob';
export default class VindEenJobClient {

    lookupJobs(location, keyword) {

        let url = UrlBuilder.aUrl(`${URL}/vacatures`)
            .withQueryParam('ts', '1485512560843')
            .withQueryParam('offset', '0')
            .withQueryParam('limit', '6')
            .withQueryParam('afstand', '20')
            .withQueryParam('locatie', location)
            .withQueryParam('trefwoord', keyword)
            .build();

        return new Promise((resolve, error) => {
            request.get(url, (err, res, body) => {
                if (err) {
                    error(err);
                } else {
                    resolve(VindEenJobClient.transformVacature(JSON.parse(body).vacatures));
                }
            });
        });
    }

    static transformVacature(vacatures){
        return vacatures.map((vacature) => {
            return Vacature.aVacature()
                .withFunctie(vacature.functieNaam)
                .withBedrijf(vacature.plaatsNaam)
                .withLogo(vacature.logo)
                .withLink(`https://www.vdab.be/jobs/vacatures/${vacature.id}`);
        });

    }
}
