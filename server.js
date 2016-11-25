'use strict';

const express = require('express');
const Slapp = require('slapp');
const ConvoStore = require('slapp-convo-beepboop');
const Context = require('slapp-context-beepboop');
const {Wit} = require('node-wit');

// use `PORT` env var on Beep Boop - default to 3000 locally
let port = process.env.PORT || 3000;

let slapp = Slapp({
    // Beep Boop sets the SLACK_VERIFY_TOKEN env var
    verify_token: process.env.SLACK_VERIFY_TOKEN,
    convo_store: ConvoStore(),
    context: Context()
});

let client = new Wit({
    accessToken: '4KLPNU647TKNYKGL6BYHQZK2MIZSFSQI',
    actions: {
        send(request, response) {
            return new Promise((resolve) => {
                console.log(JSON.stringify(response));
                return resolve();
            });
        },
        getForecast({sessionId, context, text, entities}) {
            return new Promise((resolve, reject) => {
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
    }
});


//*********************************************
// Setup different handlers for messages
//*********************************************

// response to the user typing "help"
slapp.message('.*', ['mention', 'direct_message'], (msg, text) => {
    client.converse('session1', text, {}).then((data) => {
        msg.say(data.msg)
    })
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
