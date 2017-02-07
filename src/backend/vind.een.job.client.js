import request from 'request';
import UrlBuilder from './url.builder';
import Promise from 'Promise';
import Vacature from './vacature';

const URL = 'https://www.vdab.be/api/vindeenjob';
export default class VindEenJobClient {

    lookupJobs({location, keyword, filters}) {
        let {arbeidsduur, arbeidscircuit, diplomaNiveau} = VindEenJobClient.mapFilters(filters);

        let url = UrlBuilder.aUrl(`${URL}/vacatures`)
            .withQueryParam('ts', '1485512560843')
            .withQueryParam('offset', '0')
            .withQueryParam('limit', '6')
            .withQueryParam('afstand', '20')
            .withQueryParam('locatie', location)
            .withQueryParam('trefwoord', keyword)
            .withQueryParam('arbeidsduur', arbeidsduur)
            .withQueryParam('arbeidscircuit', arbeidscircuit)
            .withQueryParam('diplomaNiveau', diplomaNiveau)
            .build();
        console.log(`request naar VEJ ${url}`);
        return new Promise((resolve, error) => {
            request.get(url, (err, res, body) => {
                if (err) {
                    error(err);
                } else {
                    resolve(VindEenJobClient.mapToVacature(JSON.parse(body).vacatures));
                }
            });
        });
    }

    static mapFilters(filters) {
        if(!filters){
            return {};
        }
        let mapping = {
            voltijds_deeltijds: {
                voltijds: 'V',
                arbeidsduur: 'D'
            },
            type: {
                vaste_job: '8',
                interim: 5,
                loopbaancheque: 6
            },
            diploma: {
                secundair_onderwijs: 'C',
                bachelor: 'D',
                master: 'E'
            }
        };
        return {
            arbeidsduur: mapping['voltijds_deeltijds'][filters['voltijds_deeltijds']],
            arbeidscircuit: mapping['type'][filters['type']],
            diplomaNiveau: mapping['diploma'][filters['diploma']]
        };
    }

    static mapToVacature(vacatures) {
        return vacatures.map((vacature) => {
            return Vacature.aVacature()
                .withFunctie(vacature.functieNaam)
                .withBedrijf(vacature.plaatsNaam)
                .withLogo(vacature.logo)
                .withLink(`https://www.vdab.be/jobs/vacatures/${vacature.id}`);
        });

    }
}
