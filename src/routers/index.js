const { Router } = require('express')
const router = Router();
const { userController, petController, authenticationController } = require('../controllers')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')

router.use(authenticationMiddleware)

router.post('/authentication', authenticationController.authenticate)

router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.get('/users', userController.select);
router.get('/users/:id', userController.selectById);
router.get('/users/:id/pets', userController.listPetsUser);
router.delete('/users/:id', userController.remove);

router.post('/pets', petController.create);
router.put('/pets/:id', petController.update);
router.get('/pets', petController.select);
//todo: arrumar consulta por id invalido (null)

router.get('/pets/:id', petController.selectById);
router.delete('/pets/:id', petController.remove);

router.post('/pets/:id/adopted', petController.adopted);

module.exports = router;