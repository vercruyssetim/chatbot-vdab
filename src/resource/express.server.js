import bodyParser from 'body-parser';
import express from 'express';

/* global __dirname */
export default class ExpressServer {

    constructor(hostName, portName) {
        this.port = portName;
        this.hostname = hostName;
        this.server = null;
    }

    startServer() {
        this.server = express();
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({extended: true}));
        this.server.use(express.static(__dirname + '/public'));
        this.server.listen(
            this.port,
            this.hostname,
            () => console.log('** Starting expressserver on port ' + this.port)
        );
    }
}

