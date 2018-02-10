const { authenticate } = require('./middleware/authentication');

/* ------------------------------------------------
*   Creating environment variables from config file
*   DO NOT EDIT THE FOLLOWING
* ------------------------------------------------- */
const env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
    const config = require('./config/config.json');
    const envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

/** APP CONFIGURATION FILE 
 *  Load API Modules
 *  The 3 modules are:
 *  1) User - APIs for mobile app
 *  2) Restaurant - APIs for restaurants
 *  3) Admin - APIs for administrator
 *  API routing is handled in sub modules
 */
 module.exports.appModules = {
    'user': {
        modules: [
            'login'
        ],
        auth: authenticate.user
    },
    'restaurant': {
        modules: [
            'login'
        ],
        auth: authenticate.restaurant
    },
    'admin': {
        modules: [
            'login'
        ],
        auth: authenticate.admin
    }
 };