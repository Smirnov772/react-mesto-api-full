const router = require('express').Router();
const validationObject = require('../middlewares/validationObject');

const { validateCreateCard } = require('../middlewares/validation');

const {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
} = require('../conrollers/cards');

router.get('/', getCards);
router.post('/', validateCreateCard, createCards);
router.delete('/:cardId', validationObject, deleteCards);
router.put('/:cardId/likes', validationObject, likeCard);
router.delete('/:cardId/likes', validationObject, dislikeCard);

module.exports = router;
