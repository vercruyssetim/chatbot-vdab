'use strict';

const express = require('express');
const Slapp = require('slapp');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');
const {Wit, log} = require('node-wit');

// use `PORT` env var on Beep Boop - default to 3000 locally
let port = process.env.PORT || 3000;

let slapp = Slapp({
    // Beep Boop sets the SLACK_VERIFY_TOKEN env var
    verify_token: process.env.SLACK_VERIFY_TOKEN,
    convo_store: ConvoStore(),
    context: Context()
});

const firstEntityValue = (entities, entity) => {
    const val = entities && entities[entity] &&
            Array.isArray(entities[entity]) &&
            entities[entity].length > 0 &&
            entities[entity][0].value
        ;
    if (!val) {
        return null;
    }
    return typeof val === 'object' ? val.value : val;
};

let client = new Wit({
    accessToken: '4KLPNU647TKNYKGL6BYHQZK2MIZSFSQI',
    actions: {
        send(request, response) {
            const {sessionId, context, entities} = request;
            const {text, quickreplies} = response;
            return new Promise(function (resolve, reject) {
                console.log('receiving...', JSON.stringify(request));
                console.log('sending...', JSON.stringify(response));
                return resolve();
            });
        },
        getForecast({context, entities}) {
            return new Promise((resolve, reject) => {
                console.log('context: ', JSON.stringify(context));
                console.log('entities: ', JSON.stringify(entities));
                let location = firstEntityValue(entities, 'location');
                if (location) {
                    context.forecast = 'sunny in ' + location; // we should call a weather API here
                    delete context.missingLocation;
                } else {
                    context.missingLocation = true;
                    delete context.forecast;
                }
                return resolve(context);
            });
        }
    },
    logger: new log.Logger(log.debug)
});


//*********************************************
// Setup different handlers for messages
//*********************************************

// response to the user typing "help"
slapp.message('.*', ['mention', 'direct_message'], (msg, text) => {
    client.message(text, {}).then((data) => {
        console.log(data);
        console.log(data.entities.location);
        msg.say(data.msg || 'nothing to say')
    })
        .catch(console.error);
});


// attach Slapp to express server
let server = slapp.attachToExpress(express());

// start http server
server.listen(port, (err) => {
    if (err) {
        return console.error(err)
    }

    console.log(`Listening on port ${port}`)
});
