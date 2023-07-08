'use strict';

const { Router } = require('express');
const router = Router();
const controller = require('../controllers/main-controller');

router.get('/rating', controller.getRating);
router.post('/subscribe', controller.subscribe);
router.post('/unsubscribe', controller.unsubscribe);

module.exports = router;