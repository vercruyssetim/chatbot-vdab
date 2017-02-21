import bodyParser from 'body-parser';
import express from 'express';

/* global __dirname */
export default class ExpressServer {

    constructor() {
        this.port = 3000;
        this.hostname = '0.0.0.0';
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

