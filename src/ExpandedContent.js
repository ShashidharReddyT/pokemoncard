import React, { useState } from 'react';
import './ExpandedContent.css';

function ExpandedContent({ pokemon, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false); // State to manage expansion

  const typeColors = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    normal: '#bdb3a9',
    bug: '#9d6f29',
    ground: '#c2b280',
    poison: '#b96fa8',
    electric: '#c9d433',
    fairy: '#c25688',
  };

  const backgroundColor = typeColors[pokemon.type] || '#FFFFFF';

  const handleOpen = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    onClose();
  };

  return (
    <div className={`expanded-container ${isExpanded ? 'active' : ''}`}>
      <div className="expanded-content">
        <button className="close-button" onClick={handleClose}>
          X
        </button>
        <div className="details" style={{ backgroundColor }}>
          <table>
            <tbody>
              <tr>
                <td rowSpan="3" className="pokemonimg">
                  <img src={pokemon.image} alt={pokemon.name} />
                </td>
                <td colSpan="2">
                  <h2>{pokemon.name}</h2>
                </td>
              </tr>
              <tr>
                <td>Weight: {pokemon.weight}</td>
                <td>Height: {pokemon.height}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Base Stat</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map((stat, index) => (
                <tr key={stat.stat.name}>
                  <td>Stat {index + 1}: {stat.stat.name}</td>
                  <td>Bs {index + 1}: {stat.base_stat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ExpandedContent;
