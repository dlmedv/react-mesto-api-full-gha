
function ImagePopup(props) {
    return (
        <section className={`popup popup_photo ${props.card.link ? 'popup_active' : ''}`}>
            <div className="popup__container-img">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <img className="popup__image" alt={props.card.name} src={props.card.link} />
                <h2 className="popup__title-img">{props.card.name}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;