import closeIcon from '../img/CloseIcon.svg';
import React from 'react';

function PopupWithForm({name, isOpen, onClose, title, submitButtonText, onSubmit, children}) {
    return (
        <div className={`popup popup_${name} ${isOpen && 'popup_open'} close-area`}>
            <div className="popup__container">
                <button onClick={onClose}  type="button" className="button popup__button popup__button_type_close close-area" data-bs-dismiss="edit-form" aria-label="Close" data-close>
                    <img className="popup__icon popup__icon_type_close close-area" src={closeIcon} alt="крестик" />
                </button>
                <div className="popup__content">
                    <h2 className="popup__heading">{title}</h2>
                    <form onSubmit={onSubmit} className="popup__form form form_edit" name={name}>
                        {children}
                        <button type="submit" className="button form__submit" aria-label="Создать"
                                name="formSubmit">
                            {submitButtonText}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm;