import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";


function Register({onSubmit}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            email,
            password
        });
    }
    return (<PopupWithForm
        name='login'
        title='Регистрация'
        submitButtonText="Зарегистрироваться"
        onSubmit={onSubmit}
    >
        <label htmlFor="place-input" className="form__label">
            <input value={email || ''} onChange={handleEmailChange} type="email" name="emailInput" id="emailInput"
                   className="form__item form__item_dark-form form__item_el_email"
                   placeholder="Email" maxLength={30} minLength={2} required/>
            <span className="form__item-error place-input-error"/>
        </label>
        <label htmlFor="url-input" className="form__label">
            <input value={password || ''} onChange={handlePasswordChange} type="password" id="passwordInput" name="passwordInput"
                   className="form__item form__item_dark-form form__item_el_password"
                   placeholder="Пароль" minLength={2} required/>
            <span className="form__item-error url-input-error"/>
        </label>
    </PopupWithForm>)
}
export default Register;