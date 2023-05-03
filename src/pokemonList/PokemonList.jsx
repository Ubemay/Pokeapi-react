import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './pokemonList.css';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
      setPokemonList(response.data.results);
    };
    fetchPokemonList();
  }, []);

  return (
    <div className="container">
      <div className="pokemon-grid">
        {pokemonList.map(pokemon => (
          <Link key={pokemon.name} to={`/pokemon/${pokemon.url.split('/')[6]}`}>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;