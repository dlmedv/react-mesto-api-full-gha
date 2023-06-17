import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    useEffect(() => {
        setName('')
        setLink('')
    }, [props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            button='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                value={name}
                onChange={handleChangeName}
                type="text"
                id="name"
                name="name"
                className="popup__input popup__input_type_title"
                placeholder="Название"
                required minLength="2" maxLength="30" />
            <span className="popup__error name-input-error"></span>
            <input
                value={link}
                onChange={handleChangeLink}
                type="url"
                id="about"
                name="link"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку" required />
            <span className="popup__error about-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;