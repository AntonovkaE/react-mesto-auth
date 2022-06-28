import React from 'react';

function Form({title, onSubmit, name, submitButtonText, children}) {
    return (
            <div className="popup__content">
                <h2 className={`popup__heading popup__heading_${name}`}>{title}</h2>
                <form onSubmit={onSubmit} className="popup__form form form_edit" name={name}>
                    {children}
                    <button type="submit" className={`button form__submit form__submit_${name}`} aria-label="Создать"
                            name="formSubmit">
                        {submitButtonText}
                    </button>
                </form>
            </div>
    )
}

export default Form;