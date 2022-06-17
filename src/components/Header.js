import React from 'react';
import logo from "../img/logo.svg";


function Header({loggedIn}) {
    return (
        <header className="header">
            <img src={logo} alt="место" className="header__logo" />
            <p className="header__auth">Войти</p>
        </header>
    );
}

export default Header;

