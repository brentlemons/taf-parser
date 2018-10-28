'use strict'

const Taf = require('./lib/taf');

module.exports = tafParser;

function tafParser(tafString) {

    return new Taf(tafString);

}

