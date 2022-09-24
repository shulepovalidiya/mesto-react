import React, { useEffect, useState } from "react";
import '../index.css';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser ] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([Api.getUserData(), Api.getInitialCards()])
            .then(([userData, cardsArr]) => {
                setCurrentUser(userData)
                setCards(cardsArr)
            })
            .catch(err => {
                console.log(`Произошла ошибка: ${err}`);
            })
    })

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard({
            name: card.name,
            link: card.link,
        })
    }

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    const handleUpdateUser = ({name, about}) => {
        Api.setUserData(name, about)
            .then(res => setCurrentUser(res))
            .then(closeAllPopups())
            .catch(err => console.log(err))
    }

    const handleUpdateAvatar = (link) => {
        Api.updateAvatar(link)
            .then(res => setCurrentUser(res))
            .then(closeAllPopups())
            .catch(err => console.log(err))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        Api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(err => {
                console.log(`Произошла ошибка: ${err}`)
            })
    }

    function handleCardDelete(card) {
        Api.deleteCard(card._id)
            .then((res) => {
                setCards((state) => state.filter((c) => c._id !== card._id))
            })
    }

    function handleAddPlaceSubmit(name, link) {
        Api.createNewCard(name, link)
            .then(newCard => setCards([newCard, ...cards]))
            .then(closeAllPopups())
            .catch(err => console.log(err))

    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}/>
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser} />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}/>

                <PopupWithForm
                    name="confirm-deletion"
                    title="Вы уверены?"
                    isOpen={false}
                    onClose={closeAllPopups}
                    buttonText="Да"
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
