import React from 'react';
import {useState} from "react";

function Authorization({name, title, submitButtonText, onSubmit}) {
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
    return (
                <div className="auth">
                    <h2 className="auth__heading">{title}</h2>
                    <form onSubmit={handleSubmit} className="auth__form form" name={name}>
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
                        <button type="submit" className="button button_white form__submit form__submit_auth" aria-label={submitButtonText}
                                name="formSubmit">
                            {submitButtonText}
                        </button>
                    </form>
                </div>
    );
}
export default Authorization;