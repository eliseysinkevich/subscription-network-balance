'use strict';

const { Router } = require('express');
const router = Router();
const controller = require('../controllers/subscription-controller');

/**
 * Create subscription, adding a new record to `subscription` 
 * + recalculating network balance
 * login is passed as a number, not string
 */
router.post('/subscribe', controller.subscribe);

/**
 * Remove subscription, removing a record from `subscription` 
 * + recalculating network balance
 * login is passed as a number, not string
 */
router.post('/unsubscribe', controller.unsubscribe);

module.exports = router;
