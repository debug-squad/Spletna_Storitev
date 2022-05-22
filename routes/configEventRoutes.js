var express = require('express');
var router = express.Router();
var configEventController = require('../controllers/configEventController.js');
const {middleware: {ensureAuthenticated, ensureIsAdmin}} = require('../auth');

router.use(ensureIsAdmin);

/*
 * GET
 */
router.get('/config', configEventController.dodaj);
router.get('/', configEventController.list);

/*
 * GET
 */
router.get('/:id', configEventController.show);


/*
 * POST
 */
router.post('/', configEventController.create);

/*
 * PUT
 */
router.put('/:id', configEventController.update);

/*
 * DELETE
 */
router.delete('/:id', configEventController.remove);

module.exports = router;
