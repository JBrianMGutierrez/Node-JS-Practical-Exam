let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexControllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/rest/getAll', indexController.getData);

router.get('/rest/get/:id', indexController);

router.post('/rest/create', indexController);

router.patch('/rest/update/:id', indexController);

router.delete('/rest/delete', indexController);

module.exports = router;