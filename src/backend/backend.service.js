import Promise from 'Promise';

export default class BackendService {
    constructor(vindEenJobClient, senderService, sessionRepository) {
        this.vindEenJobClient = vindEenJobClient;
        this.senderService = senderService;
        this.sessionRepository = sessionRepository;
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

    showFilters(call) {
        this.senderService.sendQuickReplies(call.sessionId, 'Dit zijn filters', ['ik', 'ben', 'tof']);
        call.context.filterShown = true;
        return Promise.resolve(call.context);
    }

    lookupJobs({sessionId, context}) {
        this.vindEenJobClient.lookupJobs(context.location, context.keyword)
            .then((response) => {
                if (response.length > 0) {
                    this.senderService.sendElements(sessionId, BackendService.mapToElements(response));
                    context.jobsfound = 'Ik kan je enkele filters tonen';
                    delete context.nojobsfound;
                } else {
                    context.nojobsfound = true;
                    delete context.jobsfound;
                }
            });
        return Promise.resolve(context);
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
