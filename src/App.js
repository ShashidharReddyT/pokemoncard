import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonCard from './PokemonCard';
import ExpandedContent from './ExpandedContent';

export function App() {
    const [pokemonData, setPokemonData] = useState([]);
    const [expandedPokemon, setExpandedPokemon] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [endOfPages, setEndOfPages] = useState(false);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch('https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1');
                const data = await response.json();
                const pokemonList = data[0].results;

                const fetchedPokemonData = await Promise.all(pokemonList.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const pokemonDetails = await response.json();

                    const imageUrl = pokemonDetails[0].image || '';
                    const type = pokemonDetails[0].type;

                    return {
                        name: pokemon.name,
                        type: type,
                        imageUrl: imageUrl,
                        url: pokemon.url,
                    };
                }));

                setPokemonData(fetchedPokemonData);
                setNextPageUrl(data[0].next);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemonData();
    }, []);

    const handleLoadMoreClick = async () => {
        if (nextPageUrl) {
            try {
                const response = await fetch(nextPageUrl);
                const data = await response.json();
                const newPokemonList = data[0].results;

                const fetchedPokemonData = await Promise.all(newPokemonList.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const pokemonDetails = await response.json();

                    const imageUrl = pokemonDetails[0].image || '';
                    const type = pokemonDetails[0].type;

                    return {
                        name: pokemon.name,
                        type: type,
                        imageUrl: imageUrl,
                        url: pokemon.url,
                    };
                }));

                setPokemonData(prevData => [...prevData, ...fetchedPokemonData]);
                setNextPageUrl(data[0].next);
            } catch (error) {
                console.error('Error fetching more Pokémon data:', error);
            }
        } else {
            setEndOfPages(true);
        }
    };

    const handleKnowMoreClick = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            const pokemonDetails = data[0];
            setExpandedPokemon(pokemonDetails);
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
        }
    };

    const handleCloseExpanded = () => {
        setExpandedPokemon(null);
    };

    return (
        <div className="app-container">
            <div className="heading-container">
                <h1 className="main-heading">Pokemon Kingdom</h1>
            </div>

            <div className="pokemon-container">
                {pokemonData.map((pokemon, index) => (
                    <PokemonCard
                        key={pokemon.name}
                        number={index + 1}
                        name={pokemon.name}
                        imageUrl={pokemon.imageUrl}
                        type={pokemon.type}
                        url={pokemon.url}
                        onKnowMoreClick={handleKnowMoreClick}
                    />
                ))}
            </div>

            {endOfPages ? (
                <p>End of pages</p>
            ) : (
                <div className="load-more-container">
                    <button className="load-more-button" onClick={handleLoadMoreClick}>
                        Load More Pokemons
                    </button>
                </div>
            )}
            {expandedPokemon && (
                <ExpandedContent pokemon={expandedPokemon} onClose={handleCloseExpanded} />
            )}
        </div>
    );
}

export default App;
