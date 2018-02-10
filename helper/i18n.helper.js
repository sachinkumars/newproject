/**
 * Language translation helper file
 */

 const _ = require('lodash');

 // List of all supported languages
 const languageList = ['en', 'x'];
 let langData = {};

 // Load all language files upfront - This will execute only once
 const LoadFile = () => {
    if (_.isEmpty(langData)) {
        languageList.forEach(function(language) {
            langData[language] = require(`${__dirname}/../i18n/${language}.json`);
        });
    }
    return langData;
 };

 // Language switch function - Also supports template strings
 const text = (text = '', language = 'en', data = {}) => {
    const jsonData = LoadFile();

    const compiled = _.template(jsonData[language][text] || text);
    return compiled(data);
 };

// Function to pick English/X text depending on the request - English text is used if X text is not available
const pick = (language = 'en', textEn = '', textX) => {
    return (language === 'ar' && textX != null) ? textX : textEn
};

module.exports = {
    languageList,
    text,
    pick
};