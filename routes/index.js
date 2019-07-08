let express = require('express');
let router = express.Router();
let indexController = require('../controllers/indexControllers');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Practical Exam CRUD table and RESTful API', link: '../crud/table' });
});

router.get('/rest/getAll', indexController.getData);

router.get('/rest/get/:id', indexController.getSpecificData);

router.post('/rest/create', indexController.postData);

router.put('/rest/update/:id', indexController.updateData);

router.delete('/rest/delete/:id', indexController.deleteData);

router.get('/crud/table', indexController.tblReadAllData);

router.get('/crud/get/:id', indexController.tblReadSpecificData);

router.get('/crud/add', function (res, req, next) {
    req.render('add', {title: 'POST Data'})
});

router.post('/crud/add', indexController.tblPostData);

router.get('/crud/edit/:id', indexController.tblEditData);

router.post('/crud/edit/:id', indexController.tblUpdateData);

router.get('/crud/delete/:id', indexController.tblDeleteData);

module.exports = router;