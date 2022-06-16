import React, {useEffect, useState} from 'react';
import '../App.css';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null)
    const [currentUser, setCurrentUser] = useState({})
    const [cards, setCards] = useState([])
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
    const [deleteCard, setDeleteCard] = useState(null)

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
    }
    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
    }
    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
    }
    const handleCardClick = (card) => {
        setSelectedCard(card)
    }
    const handleCartClick = (card) => {
        setDeleteCard(card)
        setIsConfirmationPopupOpen(!isConfirmationPopupOpen)
    }

    const closeAllPopups = () => {
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsConfirmationPopupOpen(false)
        setSelectedCard(null)
    }
    const handleUpdateUser = ({name, about}) => {
        api.saveUserData(name, about)
            .then(uploadUserData)
            .catch(res => console.log(res))
    }
    const uploadUserData = (userData) => {
        setCurrentUser(userData);
        closeAllPopups()
        return userData
    }

    const handleUpdateAvatar = (link) => {
        api.changeAvatar(link)
            .then(uploadUserData)
            .catch(res => console.log(res))
    }

    const handleAddPlace = ({name, link}) => {
        api.saveNewCard(name, link)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups()
                return newCard
            })
            .catch(res => console.log(res))
    }
    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(res => console.log(res));
    }
    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then((res) => {
                setCards((state) => state.filter(c => c._id !== card._id))
                closeAllPopups()
            })
            .catch(res => console.log(res));
    }
    useEffect(() => {
        api.getUserData()
            .then(res => {
                setCurrentUser(res)
            })
            .catch(res => console.log(res));
    }, [])

    useEffect(() => {
        api.getInitialCards()
            .then(cards => {
                setCards(cards.map(item => ({
                    name: item.name,
                    link: item.link,
                    likes: item.likes,
                    _id: item._id,
                    owner: item.owner,
                })))
            })
            .catch(err => {
                console.log(err)
            });
    }, [])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="page">
                    <Header/>
                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditProfile={handleEditProfileClick}
                        onClose={closeAllPopups}
                        onCardClick={handleCardClick}
                        cards={cards}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCartClick}
                    />
                    <Footer/>
                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
                                     onUpdateAvatar={handleUpdateAvatar}/>
                    <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
                    <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen}
                                      onClose={closeAllPopups}/>
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <ConfirmationPopup
                        isOpen={isConfirmationPopupOpen}
                        onCLose={closeAllPopups}
                        card={deleteCard}
                        onSubmit={handleCardDelete}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
