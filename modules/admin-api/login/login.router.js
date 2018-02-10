const router = require('express').Router();
const { list } = require('./login.service');

var routes = () => {
router.route('/')
.get(list);
return router;
};
module.exports = { routes, path: 'login' };
