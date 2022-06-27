import PopupWithForm from "./PopupWithForm";
import success from "../img/Union.png";
import error from "../img/Union-2.png"
import React, {useEffect, useState} from 'react';

function InfoTooltip({isOpen, onClose, resStatus}) {
    const [title, setTitle] = useState('')
    const [iconSrc, setIconSrc] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        if (resStatus !== 400) {
            setTitle('Вы успешно зарегистрировались!')
            setIconSrc(success)
        } else {
            setTitle('Что-то пошло не так!\n' +
                'Попробуйте ещё раз.')
            setIconSrc(error)
        }
    }, [resStatus])

    return (<PopupWithForm
            name='infoTooltip'
            title={title}
            isOpen={isOpen}
            onClose={onClose}
            submitButtonText=""
            onSubmit={handleSubmit}
        >
            <img src={iconSrc} alt="success" className="popup__notification"/>
        </PopupWithForm>
    );
}

export default InfoTooltip;