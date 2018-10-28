'use strict';

var moment = require('moment');

var parseRegEx = /^(METAR|SPECI)\s(\w{4})\s([0-9]{6}Z)(\sAUTO)?\s(.*)$/;

class Conditions {

    /*
    * m[0] = passed string
    * m[1] = type
    * m[2] = station
    * m[3] = time
    * m[4] = auto
    * m[5] = conditions
    */

    constructor(conditionsString) {
        this.valid = moment.utc();
        this.wind = '';
        this.visibility = 0.0;
        this.presentWeather = [];
        this.coverage = [];
        this.altimeter = 0.0;
        this.temperature = 0;
        this.dewPoint = 0;
        this.ceiling = 0;
        this.flightCategory = 'VFR';
        this.unknown = [];


    // private ValidTimes valid;
    // private Wind wind;
    // private Double visibility;
    // private List<PresentWeather> presentWeather;
    // private List<CloudCoverage> coverage;
    // private Double altimeter;
    // private Integer temperature;
    // private Integer dewPoint;   
    // private Integer ceiling;
    // private String flightCategory;
    // private List<String> unknown;

        // var parsed = parseRegEx.exec(metarString);

        // if (parsed) {
        //     this.type = parsed[1].trim();

        //     this.station = parsed[2];
            
        //     this.time = this.parseTimestamp(parsed[3]);
            
        //     this.auto = parsed[4] != undefined;

        //     this.conditions = parsed[5];

        //     // if (!m.group("station").trim().isEmpty() && this.station == null) {
        //     //     this.station = new Station(m.group("station").trim());
        //     // }
            
        //     // if (m.group("time") != null && !m.group("time").isEmpty()) {
        //     //     this.time = this.parseTime(m.group("time").trim());
        //     // }
                        
        //     // if (m.group("conditions") != null && !m.group("conditions").isEmpty()) {
        //     //     this.conditions = parseConditions(m.group("conditions").trim());
        //     // }

        // } else {
        //     console.log('didnt parse');
        // }

    }

    parseTimestamp(timestamp) {
        var now = moment.utc();
        var day = 0, hour = 0, minute = 0;

        var m = /^([0-9]{2})([0-9]{2})([0-9]{2})?Z?$/.exec(timestamp);
        if (m) {
            day = parseInt(m[1]);
            hour = parseInt(m[2]);
            minute = m.length > 3 ? parseInt(m[3]) : 0;
        }
                
        //TODO: This can be improved by looking at actual days in the month
        if (now.date() - day > 7) {
            now = now.add(1, 'months').date(day);
        } else if (day - now.date() > 1) {
            now = now.subtract(1, 'months').date(day);
        } else {
            now = now.date(day);
        }
        
        if (hour > 23) {
            now = now.add(1, 'days');
            hour = 0;
        }
        
        now = now.hour(hour).minute(minute).second(0).millisecond(0);
        
        return now;
    }

}

module.exports = Conditions;