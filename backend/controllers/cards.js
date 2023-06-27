const cardsModel = require('../models/card');
const Forbidden = require('../errors/Forbidden');
const BadRequest = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');

const getCards = (req, res, next) => {
  cardsModel.find({}).sort({ createdAt: -1 }).then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  cardsModel.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные для получения данных пользователя'));
      }
      return next(err);
    });
};

// eslint-disable-next-line consistent-return
const deleteCard = (req, res, next) => {
  cardsModel.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFound('Такой карточки не существует');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new Forbidden('Вы не можете удалить чужую карточку');
      }
      cardsModel.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Пост удалён' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные для получения данных пользователя'));
      }
      return next(err);
    });
};

const putLikes = (req, res, next) => {
  cardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  cardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка не найдена');
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLikes,
  deleteLike,
};
