import logo from "../img/logo.svg";
import {NavLink} from "react-router-dom";


function Header({email, onLogout, loggedIn}) {
    let activeClassName = 'link header__auth';
    const hidden = 'hidden';

    return (
        <header className="header">
            <img src={logo} alt="место" className="header__logo"/>
            <div className="header__menu">
                <p className="header__email">{loggedIn ? email : ''}</p>
                <nav>
                    <ul className="list">
                        <li>
                            <NavLink
                                to="/sign-up"
                                className={({isActive}) =>
                                    (!isActive && !loggedIn) ? activeClassName : hidden
                                }
                            >
                                Регистрация
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-in"
                                className={({isActive}) =>
                                    (!isActive && !loggedIn) ? activeClassName : hidden
                                }
                            >
                                Войти
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-in"
                                className={
                                    loggedIn ? activeClassName : hidden
                                }
                                onClick={onLogout}
                            >
                                Выйти
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

