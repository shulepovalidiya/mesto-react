import React from "react";
import '../index.css';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

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

    return (
        <div className="page">
            <Header/>
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer/>
            <PopupWithForm
                name="edit-profile"
                title="Редактировать профиль"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}>
                <div className="popup__field-container">
                    <input type="text"
                           id="name-field"
                           name="username"
                           className="popup__field popup__edit-field"
                           placeholder="Ваше имя"
                           minLength="2"
                           maxLength="40"
                           required/>
                    <span className="name-field-error"></span>
                </div>
                <div className="popup__field-container">
                    <input type="text"
                           id="bio-field"
                           name="bio"
                           className="popup__field popup__edit-field"
                           placeholder="Чем вы занимаетесь?"
                           minLength="2"
                           maxLength="200"
                           required/>
                    <span className="bio-field-error"></span>
                </div>
            </PopupWithForm>

            <PopupWithForm
                name="add-card"
                title="Новое место"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>
                <div className="popup__field-container">
                    <input
                        type="text"
                        id="place-name-field"
                        className="popup__field popup__add-card-field"
                        placeholder="Название"
                        name="name"
                        minLength="2"
                        maxLength="30"
                        required/>
                    <span className="place-name-field-error"></span>
                </div>
                <div className="popup__field-container">
                    <input
                        type="url"
                        id="picture-link-field"
                        className="popup__field popup__add-card-field"
                        placeholder="Ссылка на картинку"
                        name="link"
                        required/>
                    <span className="picture-link-field-error"></span>
                </div>
            </PopupWithForm>

            <PopupWithForm
                name="confirm-deletion"
                title="Вы уверены?"
                isOpen={false}
                onClose={closeAllPopups}
            />

            <PopupWithForm
                name="update-avatar"
                title="Обновить аватар"
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}>
                <div className="popup__field-container">
                    <input
                        type="url"
                        id="avatar-link-field"
                        className="popup__field popup__update-avatar-field"
                        placeholder="Ссылка на фотографию"
                        name="avatar-link"
                        required/>
                    <span className="avatar-link-field-error"></span>
                </div>
            </PopupWithForm>

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}/>
        </div>
    );
}

export default App;
