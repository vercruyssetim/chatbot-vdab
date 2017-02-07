export default class FilterService {

    constructor() {
        this.filters = {
            voltijds_deeltijds: {
                label: 'voltijds/deeltijds',
                options: {
                    voltijds: 'voltijds',
                    deeltijds: 'deeltijds'
                }
            },
            type: {
                label: 'type',
                options: {
                    vaste_job: 'vaste job',
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

    getLabel(key){
        return this.getFilters()[key];
    }

    toString(filters){
        let keys = Object.keys(filters);
        let result = '';
        for(let index = 0; index < keys.length; index ++){
            if(index !== 0){
                if(index + 1 === keys.length){
                    result += ' en ';
                } else {
                    result += ', ';
                }
            }
            let key = keys[index];
            let filter = this.filters[key];
            result += `${filter.label}: ${filter.options[filters[key]]}`;
        }
        return result;
    }

}
