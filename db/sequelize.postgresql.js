const Sequelize = require('sequelize');

const connectionString = process.env.POSTGRESQL_URI || 'postgres://postgres@localhost:5400/newproject';
const options = {
    dialect: 'postgres',
    logging: false
};

const connection = new Sequelize(connectionString, options);

module.exports = connection;