const Moment = require('moment');

// Function to get current UTC time
const getCurrentTime = () => {
    return Moment.utc().format();
};

module.exports = {
    getCurrentTime
};