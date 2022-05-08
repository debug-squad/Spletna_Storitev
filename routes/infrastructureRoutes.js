var express = require('express');
var router = express.Router();
var infrastructureController = require('../controllers/infrastructureController.js');

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
router.post('/', infrastructureController.create);

/*
 * PUT
 */
router.put('/:id', infrastructureController.update);

/*
 * DELETE
 */
router.delete('/:id', infrastructureController.remove);

module.exports = router;
