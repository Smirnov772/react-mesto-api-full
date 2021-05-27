const router = require('express').Router();
const { validateUpdateUser, validateAvatar } = require('../middlewares/validation');
const validationObject = require('../middlewares/validationObject');

const {
  getUsers,
  // createUsers,
  deleteUser,
  getUsersId,
  updateUsers,
  updateUsersAvatar,
  getCurrentUser,
} = require('../conrollers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateUpdateUser, updateUsers);
router.get('/:userId', validationObject, getUsersId);
router.delete('/:userId', deleteUser);
// router.post("/", createUsers);
router.patch('/me/avatar', validateAvatar, updateUsersAvatar);

module.exports = router;
