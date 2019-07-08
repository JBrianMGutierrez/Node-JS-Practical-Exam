let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexControllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/rest/getAll', indexController.getData);

router.get('/rest/get/:id', indexController.getSpecificData);

router.post('/rest/create', indexController.postData);

router.patch('/rest/update/:id', indexController.updateData);

router.delete('/rest/delete/:id', indexController.deleteData);

router.get('/crud/table', indexController.tblReadAllData);

module.exports = router;