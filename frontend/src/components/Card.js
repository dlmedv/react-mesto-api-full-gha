import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`element__icon + ${isLiked && 'element__icon_active'}`)

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <div className="element" >
            <button
                type="button"
                className="element__button-photo">
                <img
                    className="element__photo"
                    src={props.card.link}
                    alt={props.card.name}
                    onClick={handleClick}
                /></button>
            {isOwn && <button
                type="button"
                className=" element__icon-trash"
                onClick={handleDeleteClick}></button>}
            <div className="element__group">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__group2">
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}></button>
                    <p className="element__numbers">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;