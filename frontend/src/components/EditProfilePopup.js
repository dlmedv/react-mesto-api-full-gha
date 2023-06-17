import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import PopupWithForm from './PopupWithForm'

function EditProfilePopup(props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, props.isOpen])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }
    return (
        <PopupWithForm
            name='edit-card'
            title='Редактировать профиль'
            button='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                value={name ?? ''}
                onChange={handleChangeName}
                type="text"
                id="username"
                name="name"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                required minLength="2" maxLength="40"
            />
            <span className="popup__error username-input-error"></span>
            <input
                value={description ?? ''}
                onChange={handleChangeDescription}
                type="text"
                id="job"
                name="about"
                className="popup__input popup__input_type_about"
                placeholder="Вид деятельности"
                required minLength="2" maxLength="200" />
            <span className="popup__error job-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;