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

    getInitialCards(token) {
        return fetch(`${this._url}/cards`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(res => this._checkStatusRes(res))
    }

    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(res => this._checkStatusRes(res))
    }

    setInfoUser({ name, about, jwt }) {
        return fetch(`${this._url}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt.token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    createNewCard(item, jwt) {
        return fetch(`${this._url}/cards`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt.token}`,
            },
            method: 'POST',
            body: JSON.stringify({
                name: item.name,
                link: item.link,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    deleteCard(cardId, jwt) {
        return fetch(`${this._url}/cards/${cardId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt.token}`,
            },
            method: 'DELETE',
        })
            .then(res => this._checkStatusRes(res))
    }

    setLikes(cardId, jwt) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt.token}`,
            },
            method: 'PUT'
        })
            .then(res => this._checkStatusRes(res))
    }

    deleteLikes(cardId, jwt) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt.token}`,
            },
            method: 'DELETE'
        })
            .then(res => this._checkStatusRes(res))
    }

    setUserAvatar(newAvatarLink, jwt) {
        return fetch(`${this._url}/users/me/avatar`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt.token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: newAvatarLink,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    changeLikeCardStatus(isLiked, cardId, jwt) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt.token}`,
            },
            method: isLiked ? 'DELETE' : 'PUT'
        })
            .then(res => this._checkStatusRes(res))
    }
}

export const api = new Api(options)