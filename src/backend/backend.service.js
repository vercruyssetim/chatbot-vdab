import Promise from 'Promise';

export default class BackendService {
    constructor(vindEenJobClient, senderService, sessionRepository, filterService) {
        this.vindEenJobClient = vindEenJobClient;
        this.senderService = senderService;
        this.sessionRepository = sessionRepository;
        this.filterService = filterService;
        this.filters = {};
    }

    saveLocation({context, entities}) {
        let entity = BackendService.firstEntityValue(entities, 'location');
        BackendService.saveEntity(context, entity, 'location');
        return Promise.resolve(context);
    }

    saveKeyword({context, entities}) {
        let entity = BackendService.firstEntityValue(entities, 'company');
        if (!entity) {
            entity = BackendService.firstEntityValue(entities, 'profession');
        }
        BackendService.saveEntity(context, entity, 'keyword');
        return Promise.resolve(context);
    }

    saveLiteralKeyword({context, text}) {
        BackendService.saveEntity(context, text, 'keyword');
        return Promise.resolve(context);
    }

    clearData({sessionId}) {
        this.sessionRepository.clear(sessionId);
        return Promise.resolve({});
    }

    showFilters({sessionId, context}) {
        this.senderService.sendButtons(sessionId, 'Maak u keuze uit volgende filters', this.filterService.getFilters());
        context.filtershown = true;
        return Promise.resolve(context);
    }

    showFilterOptions({sessionId, context, text}) {
        this.senderService.sendButtons(sessionId, 'Kies een optie', this.filterService.getFilterOptions(text));
        context.selectedfilter = text;
        return Promise.resolve(context);
    }

    saveFilterOption({context, text}) {
        this.filters[context.selectedfilter] = text;
        context.filter = this.filters;
        delete context.filtershown;
        delete context.selectedfilter;
        delete context.jobsfound;
        return Promise.resolve(context);
    }


    lookupJobs({sessionId, context}) {
        return new Promise((resolve) => {
            this.vindEenJobClient.lookupJobs(context.location, context.keyword, this.filters)
                .then((response) => {
                    if (response.length > 0) {
                        this.senderService.sendElements(sessionId, BackendService.mapToElements(response));
                        context.jobsfound = true;
                        delete context.filter;
                        delete context.nojobsfound;
                    } else {
                        context.nojobsfound = true;
                        delete context.filter;
                        delete context.jobsfound;
                    }
                    console.log(`context in lookupJobs ${JSON.stringify(context)}`);
                    resolve(context);
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

    static saveEntity(context, entity, type) {
        if (entity) {
            context[type] = entity;
            delete context[`missing${type}`];
        } else {
            context[`missing${type}`] = true;
            delete context[type];
        }
    }

    static firstEntityValue(entities, entity) {
        const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value;
        if (!val) {
            return null;
        }
        return typeof val === 'object' ? val.value : val;
    }
}
