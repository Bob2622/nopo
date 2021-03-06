/*
 * grunt
 * http://gruntjs.com/
 */

var nopo = require('../core'),
    _ = require('underscore'),
    util = require('./util'),
    logger = require('./logger'),
    date = require('dateformat');

var template = module.exports = {};

// Template delimiters.
var allDelimiters = {};

// Initialize template delimiters.
template.addDelimiters = function(name, opener, closer) {
    var delimiters = allDelimiters[name] = {};
    delimiters.opener = opener;
    delimiters.closer = closer;
    var a = delimiters.opener.replace(/(.)/g, '\\$1');
    var b = '([\\s\\S]+?)' + delimiters.closer.replace(/(.)/g, '\\$1');
    delimiters.lodash = {
        evaluate: new RegExp(a + b, 'g'),
        interpolate: new RegExp(a + '=' + b, 'g'),
        escape: new RegExp(a + '-' + b, 'g')
    };
};

template.addDelimiters('config', '<%', '%>');

template.setDelimiters = function(name) {
    var delimiters = allDelimiters[name in allDelimiters ? name : 'config'];
    _.templateSettings = delimiters.lodash;
    return delimiters;
};

// Process template + data with Lo-Dash.
template.process = function(tmpl, options) {
    options = options || {};
    var delimiters = template.setDelimiters(options.delimiters);
    var data = Object.create(options.data || nopo.config.getMeta() || {});

    if (!('nopo' in data)) { data.nopo = nopo; }
    var last = tmpl;
    try {
        while (tmpl.indexOf(delimiters.opener) >= 0) {
            tmpl = _.template(tmpl, data);
            if (tmpl === last) {
                break;
            }
            last = tmpl;
        }
    } catch (e) {
        if (String(e) === 'SyntaxError: Unexpected token ILLEGAL' && /\n|\r/.test(tmpl)) {
            logger.log('A special character was detected in this template. ' + 'Inside template tags, the \\n and \\r special characters must be ' + 'escaped as \\\\n and \\\\r. (grunt 0.4.0+)');
        }
        e.message = 'An error occurred while processing a template (' + e.message + ').';
        logger.warn(e.message);
    }
    return util.normalizelf(tmpl);
};

template.today = function(format) {
    return date(new Date(), format);
};
