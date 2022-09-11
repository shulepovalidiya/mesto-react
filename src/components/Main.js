import React from "react";
import api from "../utils/Api";
import editAvatarIcon from '../images/profile/profile__edit-icon.svg';
import Card from "./Card";


function Main(props) {

    //переменные стейта
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription ] = React.useState();
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([userData, cardsArr]) => {
                setUserName(userData.name)
                setUserDescription(userData.about)
                setUserAvatar(userData.avatar)
                setCards(cardsArr)
            })
            .catch(err => {
                console.log(`Произошла ошибка: ${err}`);
            })
    })

    return (
        <main>
            <section className="profile">
                <img src={userAvatar}  alt="Аватар" className="profile__avatar" />
                <div className="profile__overlay" onClick={props.onEditAvatar}>
                    <img src={editAvatarIcon}
                         alt="Иконка редактирования"
                         className="profile__edit-icon" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__username">{userName}</h1>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={props.onEditProfile}>
                    </button>
                    <p className="profile__bio">{userDescription}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={props.onAddPlace}>
                </button>
            </section>

            <section className="places">
                <ul className="places__cards">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;