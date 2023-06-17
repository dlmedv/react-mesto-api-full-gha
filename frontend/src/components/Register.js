
import { Link } from "react-router-dom"
import useForm from "./hooks/useForm"

function Register({ registerUser }) {
    const { form, errors, handleChange } = useForm({
        email: "",
        password: "",
    })

    const handleSubmit = (evt) => {
        evt.preventDefault()
        // console.log(form)
        registerUser(form)
    }

    return (
        <>
            <main className="content-auth">
                <div className="login">
                    <h2 className="login__title">Регистрация</h2>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="login__input"
                            value={form.email}
                            onChange={handleChange}
                            minLength={3}
                            required
                        />
                        <span className="login__error-text">{errors.email}</span>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="login__input"
                            value={form.password}
                            onChange={handleChange}
                            minLength={3}
                            required
                        />
                        <span className="login__error-text">{errors.password}</span>
                        <button type='submit' className="login__button">Зарегистрироваться</button>
                    </form>
                    <p className="login__text">
                        Уже зарегистрированы?{" "}
                        <Link to="/sign-in" className="login__link">Войти</Link>
                    </p>
                </div>
            </main>
        </>
    )
}

export default Register 