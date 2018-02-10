/**
 * RESPONSE MIDDLEWARE
 * Uses message function in response object to send custom message
 * Uses return function as a replacement for send function
 */

const _ = require('lodash');
const status = require('./../config/http.status.json');
const I18n = require('../helper/i18n.helper');

const response = (req, res, next) => {
    const lang = _.trim(req.headers['x-language']) || 'en';

    // Pick text according to given language - Default is English
    if (_.indexOf(I18n.languageList, lang) === -1) {
        req.language = 'en';
    } else {
        req.language = lang;
    }

    // Message function to send custom message in response
    res.message = (message, data = {}) => {
		if (typeof message === 'string') {
			res.responseMessage = I18n.text(message, lang, data);
		}
		return res;
	};

    // Return function to format API response
    res.return = (data) => {
        const message = res.responseMessage || status[res.statusCode];
        res.send({
            message,
            status: res.statusCode,
            data
        });
    };

    // Error handler function
    res.errorHandler = (err = '') => {
        const error = process.env.NODE_ENV !== 'production' ? err : undefined;

        if (err.message && err.message === 'EACCESS') {
            return res.status(401).send({
                message: status[401],
                status: res.statusCode
            }); 
        }

        return res.status(500).send({
            message: status[500],
            status: res.statusCode,
            error
        });
    };

    next();    
};

module.exports = {
    response
};
