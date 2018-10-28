'use strict';

// const pattern = new RegExp(
//     '^(' +
//     Object.keys(CoverageType).join('|') +
//     '){1}(\\d*)(' +
//     Object.keys(CloudType).join('|') +
//     ')*.*$');

const pattern = /^((\/{4})|(\d{4})|(?:(?:([0-9]{1,2})|(([0-9]{1,2})\s([0-9])\/([0-9]))|(([0-9])\/([0-9])))SM))(NDV)?$/;
    /*
     * m[1] = visibility
     * m[2] = not available
     * m[3] = meters
     * m[4] = wholeVis
     * m[5] = wholeFractionVis
     * m[6] = wfvWhole
     * m[7] = wfvNumerator
     * m[8] = wfvDenominator
     * m[9] = fractionVis
     * m[10] = fvNumerator
     * m[11] = fvDenominator
     * m[12] = ndv
    */


const altitudeMultiplier = 100;

class Visibility {

    constructor(visibility) {

        this.symbol = visibility;
        this.parseVisibility(visibility);

    }

    parseVisibility(visibility) {
        var parsed = pattern.exec(visibility);
        if (parsed) {
            if (parsed[3] != undefined) {
                this.unit = 'm';
                this.value = parseFloat(parsed[3].trim());
            } else if (parsed[4] != undefined) {
                this.unit = 'SM';
                this.value = parseFloat(parsed[4].trim());
            } else if (parsed[5] != undefined) {
                this.unit = 'SM';
                var value = 0.0;
                if (parsed[6] != undefined) {
                    value = parseFloat(parsed[6].trim());
                }
                if (parsed[7] != undefined && parsed[8] != undefined) {
                    value += (parseFloat(parsed[7].trim()) / parseFloat(parsed[8].trim()));
                }
                this.value = value;
            } else if (parsed[9] != undefined) {
                if (parsed[10] != undefined && parsed[11] != undefined) {
                    this.unit = 'SM';
                    this.value = (parseFloat(parsed[10].trim()) / parseFloat(parsed[11].trim()));
                }
            } else if (parsed[2] != undefined) {
                this.unit = 'Not Included';
            }

            if (parsed[12] != undefined) {
                this.ndv = true;
            }
        }
    }

}

module.exports = Visibility;
module.exports.pattern = pattern;