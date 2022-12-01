
const userController = require('../backend/controller/userController');
const router = require('express').Router();
// Contact routes
router.route('/createUser')
    .post(userController.createUser);
router.post('/updateUserData',userController.updateUserData); 
router.get('/getAllUsers',userController.getAllUsers);
router.delete('/delete',userController.deleteUser);

// Export API routes
module.exports = router;