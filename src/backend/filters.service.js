export default class FilterService {

    constructor() {
        this.filters = {
            voltijds_deeltijds: {
                label: 'voltijds of deeltijds',
                options: {
                    voltijds: 'voltijds',
                    deeltijds: 'deeltijds'
                }
            },
            type: {
                label: 'type',
                options: {
                    vaste_jobs: 'vaste job',
                    interim: 'interim',
                    dienstenchequebaan: 'dienstenchequebaan'
                }
            },
            diploma: {
                label: 'diploma',
                options: {
                    secundair_onderwijs: 'secundair onderwijs',
                    bachelor: 'bachelor',
                    master: 'master'
                }
            }
        };
    }

    getFilters() {
        let result = {};
        Object.keys(this.filters).forEach((key) => {
            result[key] = this.filters[key].label;
        });
        return result;
    }

    getFilterOptions(filter) {
        return this.filters[filter].options;
    }

}
