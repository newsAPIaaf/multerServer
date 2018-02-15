var express = require('express');
var router = express.Router();
const walmart = require('../controller/walmart')

router.get('/search', walmart.search_all);

module.exports = router;
