import React from "react";

function Card( { onCardClick, card } ) {

    function handleClick () {
        onCardClick(card);
    }

    return (
        <li className="places__card">
            <button type="button" className="places__delete-button"></button>
            <img
                alt={card.name}
                className="places__image"
                src={card.link}
                onClick={() => handleClick()}/>
            <div className="places__caption">
                <h2 className="places__name">{card.name}</h2>
                <div className="places__like-section">
                    <button type="button" className="places__like-button"></button>
                    <div className="places__like-counter">{card.likes.length}</div>
                </div>
            </div>
        </li>
    )
}

export default Card;