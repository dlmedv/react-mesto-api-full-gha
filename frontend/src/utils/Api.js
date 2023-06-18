import { options } from '../utils/utils.js'


export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    _checkStatusRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(res => this._checkStatusRes(res))
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(res => this._checkStatusRes(res))
    }

    setInfoUser({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    createNewCard(item) {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: item.name,
                link: item.link,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
        })
            .then(res => this._checkStatusRes(res))
    }

    setLikes(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT'
        })
            .then(res => this._checkStatusRes(res))
    }

    deleteLikes(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => this._checkStatusRes(res))
    }

    setUserAvatar(newAvatarLink) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: newAvatarLink,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    changeLikeCardStatus(isLiked, cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: isLiked ? 'DELETE' : 'PUT'
        })
            .then(res => this._checkStatusRes(res))
    }
}

export const api = new Api(options)