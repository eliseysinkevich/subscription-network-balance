'use strict';

const { Router } = require('express');
const router = Router();
const controller = require('../controllers/account-controller');

router.get('/rating', controller.getRating);
router.patch('/balance', controller.updateBalance);

module.exports = router;
