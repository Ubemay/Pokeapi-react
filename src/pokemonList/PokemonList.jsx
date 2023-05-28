import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './pokemonList.css';

const withLifecycleLogging = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log('Component mounted');

      return () => {
        console.log('Component unmounted');
      };
    }, []);

    useEffect(() => {
      console.log('Component updated');
    });

    return <WrappedComponent {...props} />;
  };
};

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setPokemonList(response.data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPokemonList();
  }, []);

  if (error) {
    return <ErrorDisplay message={error} />;
  }

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

const ErrorDisplay = ({ message }) => (
  <div className="pokemon-list error">
    <p>Error: {message}</p>
  </div>
);

export default withLifecycleLogging(PokemonList);
