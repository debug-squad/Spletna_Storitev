var express = require('express');
var router = express.Router();
var infrastructureController = require('../controllers/infrastructureController.js');
const {middleware: {ensureAuthenticated, ensureIsAdmin}} = require('../auth');

/*
 * GET
 */
router.get('/', infrastructureController.list);

/*
 * GET
 */
router.get('/:id', infrastructureController.show);

/*
 * POST
 */
router.post('/', ensureAuthenticated, infrastructureController.create);

/*
 * PUT
 */
router.put('/:id', ensureIsAdmin, infrastructureController.update);

/*
 * DELETE
 */
router.delete('/:id', ensureIsAdmin, infrastructureController.remove);

module.exports = router;
