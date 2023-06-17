import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <main className="contant">
                <section className="profile">
                    <div className="profile__info">
                        <button className="profile__icon-edit" type="button" onClick={props.onEditAvatar}>
                            <img className="profile__avatar" name="avatar" src={currentUser.avatar} alt="аватар профиля" />
                        </button>
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <p className="profile__subtitle">{currentUser.about}</p>
                        <button type="button" className="profile__edit" onClick={props.onEditProfile}></button>
                    </div>
                    <button type="button" className="profile__add" onClick={props.onAddPlace}></button>
                </section>
                <section className="elements">
                    {props.cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    ))}
                </section>
            </main>
        </>
    )
}

export default Main;