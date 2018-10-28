'use strict';

var CoverageType = require('./coverage-type');
var CloudType = require('./cloud-type');

const pattern = new RegExp(
    '^(?:(\\/{6})|(?:(' +
    Object.keys(CoverageType).join('|') +
    '){1}(\\d{3})?(' +
    Object.keys(CloudType).join('|') +
    ')?))$');

const altitudeMultiplier = 100;

class CloudCoverage {

    constructor(coverage) {

        this.symbol = coverage;
        this.parseCoverage(coverage);

    }

    parseCoverage(coverage) {
        var parsed = pattern.exec(coverage);
        if (parsed) {
            if (parsed[1] != undefined) {
                this.type = 'Not Included';
            } else {
                var type = parsed[2] != undefined ? parsed[2].trim() : undefined;
                if (type != undefined && type.length > 0) {
                    this.type = CoverageType[type];
                }

                var altitude = parsed[3] != undefined ? parsed[3].trim() : undefined;
                if (altitude != undefined && altitude.length > 0) {
                    this.altitude = parseInt(altitude) * altitudeMultiplier;
                }

                var cloudType = parsed[4] != undefined ? parsed[4].trim() : undefined;
                if (cloudType != undefined && cloudType.length > 0) {
                    this.cloudType = CloudType[cloudType];
                }
            }
        }
    }

}

module.exports = CloudCoverage;
module.exports.pattern = pattern;