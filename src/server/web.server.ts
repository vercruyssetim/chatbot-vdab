import * as bodyParser from 'body-parser';
import * as express from 'express';

/* global __dirname */
export class ExpressServer{
    private server : express.Express;
    private port: number;
    private hostname: string;

    constructor(){
        this.port = 3000;
        this.hostname = 'localhost';
    }

    start(){
        this.server = express();
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({extended: true}));
        this.server.use(express.static(__dirname + '/public'));
        this.server.listen(
            this.port,
            this.hostname,
            () => console.log('** Starting webserver on port ' + this.port)
        );
    }

    getServer(){
        return this.server;
    }
}
