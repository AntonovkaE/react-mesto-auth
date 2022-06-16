import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (<PopupWithForm
        name='editForm'
        title='Редактировать профиль'
        isOpen={isOpen}
        onClose={onClose}
        submitButtonText="Сохранить"
        onSubmit={handleSubmit}
    >
        <label htmlFor="name-input" className="form__label">
            <input value={name || ''} onChange={handleNameChange} type="text" name="nameInput" id="name-input"
                   className="form__item form__item_el_name"
                   placeholder="Ваше имя" maxLength={200} minLength={2} required/>
            <span className="form__item-error name-input-error"/>
        </label>
        <label htmlFor="description-input" className="form__label">
            <input value={description || ''} onChange={handleDescriptionChange} type="text" name="descriptionInput"
                   id="description-input"
                   className="form__item form__item_el_description" placeholder="О себе" maxLength={400}
                   minLength={2} required/>
            <span className="form__item-error description-input-error"/>
        </label>
    </PopupWithForm>)
}
export default EditProfilePopup;