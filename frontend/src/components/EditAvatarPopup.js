import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
  const avatarRef = useRef()

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      button='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        id="useravatar"
        name="link"
        className="popup__input popup__input_type_avatar"
        placeholder="Ссылка на аватар" required />
      <span className="popup__error useravatar-input-error"></span>

    </PopupWithForm>
  )
}

export default EditAvatarPopup;


