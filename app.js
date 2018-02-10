/* ------------------------
*   New Project API
*   Created by: Sachin
*   Created on: 10 Feb 2018
*   Node: >=8.9.4
* ------------------------- */

// ===========================
// Require the packages needed
// ===========================

const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const _ = require('lodash');

const { appModules } = require('./app.config');
const { logger } = require('./middleware/logs');
const { response } = require('./middleware/response');

// =============
// Configuration
// =============
const PORT = process.env.PORT || 7000;

const app = express();
app.use(helmet());
app.use(cors());
app.use(logger());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(response);

// ===============
// Dynamic routing
// ===============
if (appModules) {
    _.forEach(appModules, (category, key) => {
        _.forEach(category.modules, (item) => {
            const modulePath = `./modules/${key}-api/${item}/${item}.router.js`;

            if (!fs.existsSync(modulePath)) {
                throw new Error(`Dependency module '${modulePath}' not found`);
            }

            const parts = require(modulePath);
            const basePath = parts.path || item;
            app.use(`/${key}/${basePath}`, parts.routes(category.auth));
        });
    });
}

app.get('*', (req, res) => res.status(404).statusMessage('page-not-found').return());

// ============
// Start server
// ============
app.listen(PORT, () => console.log(`Server is listening at localhost:${PORT}`));

module.exports = app;