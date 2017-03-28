import {Wit} from 'node-wit';
import WitMapper from './wit.mapper';

export default class WitClient {

    constructor(witAiAccessToken) {
        this.witClient = new Wit({
            accessToken: witAiAccessToken,
        });
    }

    handleMessageReceived(message) {
        return this.witClient.message(message)
            .then((data) => WitMapper.extractEntities(data));
    }
}
