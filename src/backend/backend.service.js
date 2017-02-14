import Promise from 'Promise';
import _ from 'underscore';

export default class BackendService {
    constructor(vindEenJobClient) {
        this.vindEenJobClient = vindEenJobClient;
        this.vacatureIds = {};
    }

    lookupJobs({sessionId, location, keyword, filters}) {
        return new Promise((resolve) => {
            this.vindEenJobClient.lookupJobs({location, keyword, filters})
                .then((response) => {
                    let filteredVacatures = _.chain(response)
                        .filter((vacature) => !_.contains(this.vacatureIds[sessionId], vacature.id))
                        .first(6)
                        .value();
                    this.saveIds(sessionId, filteredVacatures);
                    resolve(BackendService.mapToElements(filteredVacatures));
                });
        });
    }

    saveIds(sessionId, filteredVacatures) {
        if (!this.vacatureIds[sessionId]) {
            this.vacatureIds[sessionId] = [];
        }
        filteredVacatures.forEach((vacature) => {
            this.vacatureIds[sessionId].push(vacature.id);
        });
    }

    static mapToElements(vacatures) {
        return vacatures.map((vacature) => {
            return {
                title: vacature.bedrijf,
                subtitle: vacature.functie,
                image: vacature.logo ? vacature.logo : 'http://i4bi.be/wp-content/uploads/2015/10/vdab-e1448897071202.png',
                link: vacature.link
            };
        });
    }

}
