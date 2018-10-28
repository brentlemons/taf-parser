'use strict';

var QualifierType = require('./qualifier-type');
var DescriptorType = require('./descriptor-type');
var PhenomenaType = require('./phenomena-type');

const pattern = new RegExp(
    '^(?:(\\/{2})|(?:(\\-|\\+|VC)?(' +
    Object.keys(DescriptorType).join('|') +
    ')?(' +
    Object.keys(PhenomenaType).join('|') +
    ')?))$');

class PresentWeather {

    constructor(weather) {

        this.symbol = weather;
        this.parseWeather(weather);

    }

    parseWeather(weather) {
        var parsed = pattern.exec(weather);
        if (parsed) {
            if (parsed[1] != undefined) {
                this.type = 'Not Included';
            } else {
                var qualifier = parsed[2] != undefined ? parsed[2].trim() : undefined;
                if (qualifier != undefined && qualifier.length > 0) {
                    this.qualifier = QualifierType[qualifier];
                }

                var descriptor = parsed[3] != undefined ? parsed[3].trim() : undefined;
                if (descriptor != undefined && descriptor.length > 0) {
                    this.descriptor = DescriptorType[descriptor];
                }

                var phenomena = parsed[4] != undefined ? parsed[4].trim() : undefined;
                if (phenomena != undefined && phenomena.length > 0) {
                    this.type = PhenomenaType[phenomena];
                }
            }
        }
    }

}

module.exports = PresentWeather;
module.exports.pattern = pattern;