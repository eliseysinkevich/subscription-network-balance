'use strict';

const { Router } = require('express');
const router = Router();
const controller = require('../controllers/account-controller');

/**
 * Return accounts, sorted by network balance
 * + subscribers count, 
 * login is returned as number, not string
 */
router.get('/rating', controller.getRating);

/**
 * Change account balance, recalculate network balance
 */
router.patch('/balance', controller.updateBalance);

module.exports = router;
