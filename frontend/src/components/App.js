import '../index.css';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js'
import { useEffect, useState } from 'react';
import { api } from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register'
import * as auth from '../utils/auth'
import ProtectedRouteElement from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [selectedCard, setSelectedCard] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userEmail, setUserEmail] = useState('')
    const [infoTooltipState, setInfoTooltipState] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        if (isLoggedIn) {
            api.getUserInfo()
                .then((res) => {
                    setCurrentUser(res)
                })
                .catch((err) => {
                    console.log(err);
                })

            api.getInitialCards()
                .then((res) => {
                    setCards(res)
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }, [isLoggedIn])

    function handleEditProfilePopupOpen() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlacePopupOpen() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarPopupOpen() {
        setIsEditAvatarPopupOpen(true)
    }


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setInfoTooltipState({})
        setSelectedCard({})
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(isLiked, card._id)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleCardDelete(card) {
        const cardId = card._id
        api.deleteCard(cardId)
            .then(() => {
                setCards((state) => state.filter((card) => card._id !== cardId))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(userInfo) {
        api.setInfoUser(userInfo)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar(avatar)
            .then((res) => {
                setCurrentUser(res)
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleAddPlaceSubmit(card) {
        api.createNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            })

    }

    const registerUser = ({ email, password }) => {
        auth.register(email, password)
            .then((res) => {
                setUserEmail(res.data.email)
                navigate('/sign-in', { replace: true })
                setInfoTooltipState({ isOpen: true, status: true })
            })
            .catch(() => setInfoTooltipState({ isOpen: true, status: false }))
            .catch((err) => console.log(err))
    }

    const loginUser = ({ email, password }) => {
        auth.authorize(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token)
                    setIsLoggedIn(true)
                    setUserEmail(email)
                    navigate('/', { replace: true })
                }
            })
            .catch(() => setInfoTooltipState({ isOpen: true, status: false }))

    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
                .then((data) => {
                    if (data) {
                        setIsLoggedIn(true);
                        setUserEmail(data.data.email);
                        navigate("/", { replace: true })
                    }

                })
                .catch((err) => console.log(err))
        }
    }, [navigate])


    const logOut = () => {
        localStorage.removeItem('jwt')
        setIsLoggedIn(false)
        setUserEmail('')
        navigate('/sign-in', { replace: true })
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>
            <div className='page'>
                <div className="page__container">
                    <Header
                        userEmail={userEmail}
                        logOut={logOut}
                    />
                    <Routes>
                        <Route path="/" element={
                            <ProtectedRouteElement
                                element={Main}
                                onEditAvatar={handleEditAvatarPopupOpen}
                                onEditProfile={handleEditProfilePopupOpen}
                                onAddPlace={handleAddPlacePopupOpen}
                                onCardClick={setSelectedCard}
                                onCardLike={handleCardLike}
                                cards={cards}
                                onCardDelete={handleCardDelete}
                                isLoggedIn={isLoggedIn}
                                userEmail={userEmail}
                                logOut={logOut}
                            />} />
                        <Route path="/sign-up" element={
                            <Register
                                registerUser={registerUser}
                                setUserEmail={setUserEmail}
                                setInfoTooltipState={setInfoTooltipState}
                            />} />
                        <Route path="/sign-in" element={
                            <Login
                                setUserEmail={setUserEmail}
                                loginUser={loginUser}
                                setIsLoggedIn={setIsLoggedIn}
                                setInfoTooltipState={setInfoTooltipState}
                            />} />

                        <Route path='*' element={<Navigate to='/' replace={true} />} />

                    </Routes>

                    {isLoggedIn && <Footer />}
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <PopupWithForm
                        name='delete-card'
                        title='Вы уверены?'
                        button='Да'
                    />
                    <ImagePopup
                        onClose={closeAllPopups}
                        card={selectedCard}
                    />
                    <InfoTooltip
                        name='info'
                        onClose={closeAllPopups}
                        isOpenConfig={infoTooltipState}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;