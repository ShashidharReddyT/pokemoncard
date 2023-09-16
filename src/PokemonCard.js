import React from 'react';

function PokemonCard({ number, name, imageUrl, type,url, onKnowMoreClick }) {
    const cardType = type ? type.toLowerCase() : ''; // Convert type to lowercase

    return (
        <div className={`pokemon-card ${cardType}`}>
            <div className="pokemon-number-circle">{`#${number}`}</div>
            <img src={imageUrl} alt={name} width={125} height={125} />
            <h2 className="pokemon-name">{name}</h2>
            <p className="pokemon-type">Type: {type}</p>
            <button className={`know-more-button ${type}-button`} onClick={() => onKnowMoreClick(url)} > Know More... </button>
        </div>
    );
}

export default PokemonCard;