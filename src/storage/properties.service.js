import propertiesReader from 'properties-reader';

export default class PropertiesService {

    constructor() {
        this.properties = propertiesReader('./application.properties');
    }

    get(propertyName) {
        return this.properties.get(propertyName);
    }

}