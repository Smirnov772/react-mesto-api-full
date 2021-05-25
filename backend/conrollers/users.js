const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  NotFoundError,
  ConflictError,
  UnAuthorizationError,
  BadRequestError,
  ServerError,
} = require('../errors/index');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => next(new ServerError('Ошибка сервера.')));
};
const getUsersId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }

      res.send(users);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Передан некорректный _id.'));
      }
      next(err);

      //  res.status(500).send({ message: "Ошибка сервера." });
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password, about, avatar,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
      about,
      avatar,
    }))
    .then((users) => res.send({
      name: users.name,
      email: users.email,
      about: users.about,
      avatar: users.avatar,
      _id: users._id,
    }))
    .catch((err) => {
      if (err.email === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании пользователя.',
          ),
        );
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(new ServerError('Ошибка сервера.'));
      }
    });
};

const updateUsers = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((users) => {
      if (!users) {
        throw new BadRequestError(' Пользователь с указанным _id не найден.');
      }
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении пользователя.',
          ),
        );
      }
      next(new ServerError('Ошибка сервера.'));
    });
};

const updateUsersAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((users) => res.send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при обновлении аватара.',
          ),
        );
      }
      next(new ServerError('Ошибка сервера.'));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorizationError('Неправильные почта или пароль');
      }

      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnAuthorizationError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
            expiresIn: '7d',
          });
          res.send({ token });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError(' Пользователь с указанным _id не найден.');
      }
      res.send(users);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Передан некорректный _id.'));
      }
      next(new ServerError('Ошибка сервера.'));
    });
};
module.exports = {
  getUsers,
  createUser,
  getUsersId,
  updateUsers,
  updateUsersAvatar,
  login,
  getCurrentUser,
};
