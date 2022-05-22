var express = require('express');
var router = express.Router();
var CONFIG_eventController = require('../controllers/CONFIG_eventController.js');

/*
 * GET
 */
router.get('/', CONFIG_eventController.list);

/*
 * GET
 */
router.get('/:id', CONFIG_eventController.show);

/*
 * POST
 */
router.post('/', CONFIG_eventController.create);

/*
 * PUT
 */
router.put('/:id', CONFIG_eventController.update);

/*
 * DELETE
 */
router.delete('/:id', CONFIG_eventController.remove);

module.exports = router;
