const Card = require('../models/card');
const {
  NotFoundError,
  BadRequestError,
  ServerError,
} = require('../errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch(() => next(new ServerError('Ошибка сервера.')));
};

const createCards = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании карточки.',
          ),
        );
      }
      next(new ServerError('Ошибка сервера.'));
    });
};

const deleteCards = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } else {
        Card.findById(req.params.cardId)
          .then(() => {
            if (!card.owner.equals(req.user._id)) {
              throw new BadRequestError('Вы не владелец карточки.');
            } else {
              Card.findByIdAndDelete(req.params.cardId)
                .then(() => {
                  res.send(card);
                })
                .catch((err) => next(err));
            }
          }).catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Передан некорректный _id.'));
      } else { next(err); }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(() => next(new NotFoundError('Нет карточки по заданному id')))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(() => next(new NotFoundError('Нет карточки по заданному id')))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(new ServerError('Ошибка сервера'));
      }
    });
};
module.exports = {
  getCards,
  createCards,
  deleteCards,
  likeCard,
  dislikeCard,
};
