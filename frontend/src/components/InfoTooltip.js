import successInfo from '../images/info-yes.svg'
import errorInfo from '../images/info-error.svg'


function InfoTooltip(props) {

    const onCloseOverlay = ({ target }) => {
        if (target.classList.contains('popup_active') || target.classList.contains('popup__close')) {
            props.onClose();
        }
    }

    return (
        <section className={`popup popup_${props.name} ${props.isOpenConfig.isOpen ? 'popup_active' : ''}`}
            onClick={onCloseOverlay}>
            <div className="popup__container-info">
                <button className='popup__close' type="button" onClick={props.onClose}></button>
                <img className="popup__info-img" src={props.isOpenConfig.status ? successInfo : errorInfo} alt='' />
                <p className="popup__title-info">{props.isOpenConfig.status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
            </div>
        </section>
    )
}

export default InfoTooltip;