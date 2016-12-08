const bodyParser = require('body-parser');
const express = require('express');

class ExpressServer{

    constructor(express, bodyParser){
        this.express = express;
        this.bodyParser = bodyParser;
        this.port = 3000;
        this.hostname = 'localhost';
        this.server = null;
    }

    $onInit(){
        this.server = this.express();
        this.server.use(this.bodyParser.json());
        this.server.use(this.bodyParser.urlencoded({extended: true}));
        this.server.use(this.express.static(__dirname + '/public'));
        this.server.listen(
            this.port,
            this.hostname,
            () => console.log('** Starting webserver on port ' + this.port)
        );
    }
}
const expressServer = new ExpressServer(express, bodyParser);
expressServer.$onInit();
module.exports = expressServer;
