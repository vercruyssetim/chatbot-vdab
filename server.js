'use strict'

const express = require('express')
const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')

var slapp = Slapp({
  convo_store: ConvoStore(),
  context: Context()
})

var app = slapp.attachToExpress(express())

slapp.message('hi (.*)', ['direct_message'], (msg, text, match1) => {
    msg.say('How are you').route('handleHi', { what: match1})
})

slapp.route('handleHi', (msg, state) => {
  msg.say(':smile: ' + state.what)
})

app.get('/', (req, res) => {
  res.send('Hello')
})

// start http server
console.log('Listening on :' + process.env.PORT)
app.listen(process.env.PORT)