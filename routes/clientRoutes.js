var express = require('express');
var router = express.Router();
var clientController = require('../controllers/clientController.js');
const {middleware: {ensureAuthenticated, ensureIsAdmin}} = require('../auth');


router.post('/login', clientController.login);
router.post('/register', clientController.register);

/*
 * GET
 */
router.get('/', clientController.list);

/*
 * GET
 */
router.get('/:id', clientController.show);

/*
 * PUT
 */
router.put('/:id', ensureIsAdmin, clientController.update);

/*
 * DELETE
 */
router.delete('/:id', ensureIsAdmin, clientController.remove);

module.exports = router;
