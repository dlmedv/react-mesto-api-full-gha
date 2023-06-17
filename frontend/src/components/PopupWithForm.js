
function PopupWithForm(props) {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? 'popup_active' : ""}`}>
            <div className="popup__container">
                <h2 className="popup__title">{props.title}</h2>
                <button className='popup__close' type="button" onClick={props.onClose}></button>
                <form name={props.name} action="#" className="popup__form" onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__button">{props.button}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;