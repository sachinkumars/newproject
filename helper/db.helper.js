/**
 *  DATABASE HELPEER FILE
 *  Used to load models generated using sequelize-auto
 *  The relation between models should also be defined here
 */

 const fs = require('fs');
 const connection = require('../db/sequelize.postgresql');

 let DB = {};

 // Load models generated using sequelize-auto
 fs.readdirSync(`${__dirname}/../models`)
    .filter((file) => file.indexOf('.') != 0)
    .forEach((file) => {
        let model = connection.import(`${__dirname}/../models/${file}`);
        DB[model.name] = model;
    });

/**
 * Relation between tables
 */