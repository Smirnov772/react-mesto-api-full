const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateRegisterBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.messages('Не корректный email');
      })
      .messages({ 'any.required': 'Обязательное поле' }),
    password: Joi.string()
      .min(2)
      .required()
      .messages({
        'string.min': 'Миниvальное поле 2 символа',
        'any.required': 'Обязательное поле',
      }),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Не корректный email');
      })
      .message({ 'any.required': 'Обязательное поле' }),
    password: Joi.string()
      .min(2)
      .required()
      .messages({
        'string.min': 'Миниvальное поле 2 символа',
        'any.required': 'Обязательное поле',
      }),
    name: Joi.string()
      .min(2)
      .max(30)
      .default('Жак-Ив Кусто'),
    about: Joi.string()
      .min(2)
      .max(30)
      .default('Исследователь'),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.messages('Не корректная ссылка');
      })
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      ),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.messages('Не корректная ссылка');
      })
      .default(
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      ),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Не корректный адрес');
      })
      .message({ 'any.required': 'Обязательное поле' }),
  }),
});
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    about: Joi.string()
      .min(2)
      .max(30)
      .required(),
  }),
});

module.exports = {
  validateRegisterBody,
  validateRegistration,
  validateAvatar,
  validateCreateCard,
  validateUpdateUser,
};
