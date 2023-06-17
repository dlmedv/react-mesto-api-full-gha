
import useForm from "./hooks/useForm"

function Login({ loginUser }) {
    const { form, errors, handleChange } = useForm({
        email: "",
        password: "",
    })

    const handleSubmit = (evt) => {
        evt.preventDefault()
        //console.log(form)
        loginUser(form)
    }

    return (
        <>
            <main className="content-auth">
                <div className="login" >
                    <h2 className="login__title">Вход</h2>
                    <form className="login__form" onSubmit={handleSubmit}>
                        <input
                            id="email"
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
                            id="password"
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
                        <button type='submit' className="login__button">Войти</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login 