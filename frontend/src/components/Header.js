import logo from '../images/logo/Vector.svg'
import { Link, Route, Routes } from 'react-router-dom'

function Header(props) {
    return (
        <header className="header">
    <img className="header__logo" src={logo} alt="логотип с надписью Mesto" />
    <Routes>
        <Route path='/' element={
            <div className='header__info'>
                <p className='header__info-user'>{props.userEmail}</p>
                <button type='button' className='header__exit' onClick={props.logOut}>Выйти</button>
            </div>
        } />
        <Route path="/sign-in" element={
            <Link to="/sign-up" className='header__link'>Регистрация</Link>
        } />
        <Route path='/sign-up' element={
            <Link to="/sign-in" className='header__link'>Войти</Link>
        } />
    </Routes>
</header>
    )
}

export default Header;

