import { options } from '../utils/utils.js'


export default class Api {
    constructor(options) {
        this._url = options.url;
        //this._headers = options.headers;
    }

    _checkStatusRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
      headers: { 
        authorization: `Bearer ${token}`,
      },
        })
            .then(res => this._checkStatusRes(res))
    }

    getUserInfo() {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
      headers: { 
        authorization: `Bearer ${token}`,
      },
        })
            .then(res => this._checkStatusRes(res))
    }

    setInfoUser({ name, about }) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            headers: { 
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    createNewCard(item) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            headers: { 
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                name: item.name,
                link: item.link,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${cardId}`, {
            credentials: 'include',
            headers: { 
                authorization: `Bearer ${token}`,
              },
            method: 'DELETE',
        })
            .then(res => this._checkStatusRes(res))
    }

    setLikes(cardId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            credentials: 'include',
            headers: { 
                authorization: `Bearer ${token}`,
              },
            method: 'PUT'
        })
            .then(res => this._checkStatusRes(res))
    }

    deleteLikes(cardId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            credentials: 'include',
            headers: { 
                authorization: `Bearer ${token}`,
              },
            method: 'DELETE'
        })
            .then(res => this._checkStatusRes(res))
    }

    setUserAvatar(newAvatarLink) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me/avatar`, {
            credentials: 'include',
            headers: { 
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            method: 'PATCH',
            body: JSON.stringify({
                avatar: newAvatarLink,
            })
        })
            .then(res => this._checkStatusRes(res))
    }

    changeLikeCardStatus(isLiked, cardId) {
        const token = localStorage.getItem('jwt');
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            credentials: 'include',
      headers: { 
        authorization: `Bearer ${token}`,
      },
            method: isLiked ? 'DELETE' : 'PUT'
        })
            .then(res => this._checkStatusRes(res))
    }
}

export const api = new Api(options)