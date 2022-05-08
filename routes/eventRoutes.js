var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController.js');
const {middleware: {ensureAuthenticated, ensureIsAdmin}} = require('../auth');

/*
 * GET
 */
router.get('/', eventController.list);

/*
 * GET
 */
router.get('/:id', eventController.show);

/*
 * POST
 */
router.post('/', ensureAuthenticated, eventController.create);

/*
 * PUT
 */
router.put('/:id', ensureIsAdmin, eventController.update);

/*
 * DELETE
 */
router.delete('/:id', ensureIsAdmin, eventController.remove);

module.exports = router;
