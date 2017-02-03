import Promise from 'Promise';

export default class BackendService {
    constructor(vindEenJobClient) {
        this.vindEenJobClient = vindEenJobClient;
    }

    lookupJobs({location, keyword, filters}) {
        console.log('looking up jobs');
        return new Promise((resolve) => {
            console.log('in promise');
            this.vindEenJobClient.lookupJobs(location, keyword, filters)
                .then((response) => {
                    resolve(BackendService.mapToElements(response));
                });
        });
    }

    static mapToElements(vacatures) {
        return vacatures.map((vacature) => {
            return {
                title: vacature.bedrijf,
                subtitle: vacature.functie,
                image: vacature.logo,
                link: vacature.link
            };
        });
    }

}
