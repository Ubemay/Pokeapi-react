import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './randomPokemon.css';

const withErrorHandling = (WrappedComponent) => {
  return function WithErrorHandling(props) {
    const [error, setError] = useState(null);

    const handleError = (message) => {
      setError(message);
    };

    return (
      <div>
        {error ? (
          <ErrorDisplay message={error} />
        ) : (
          <WrappedComponent {...props} handleError={handleError} />
        )}
      </div>
    );
  };
};

const withRandomPokemon = (WrappedComponent) => {
  return function WithRandomPokemon(props) {
    const [randomPokemon, setRandomPokemon] = useState(null);

    const fetchRandomPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * 898);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        setRandomPokemon(response.data);
      } catch (error) {
        props.handleError(error.message);
      }
    };

    useEffect(() => {
      fetchRandomPokemon();

      return () => {
        console.log('RandomPokemon component unmounted');
      };
    }, []);

    useEffect(() => {
      console.log('RandomPokemon state updated:', randomPokemon);
    }, [randomPokemon]);

    return <WrappedComponent {...props} randomPokemon={randomPokemon} fetchRandomPokemon={fetchRandomPokemon} />;
  };
};

const RandomPokemon = ({ randomPokemon, fetchRandomPokemon }) => {
  if (!randomPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="random-pokemon">
      <h1>Random Pokemon</h1>
      <img src={randomPokemon.sprites.front_default} alt={randomPokemon.name} />
      <p>Name: {randomPokemon.name}</p>
      <p>Height: {randomPokemon.height}m</p>
      <p>Weight: {randomPokemon.weight}kg</p>
      <p>Type: {randomPokemon.types[0].type.name}</p>
      <button onClick={fetchRandomPokemon}>Generate Random Pokemon</button>
    </div>
  );
};

const ErrorDisplay = ({ message }) => (
  <div className="random-pokemon error">
    <p>Error: {message}</p>
  </div>
);

const RandomPokemonWithHOC = withErrorHandling(withRandomPokemon(RandomPokemon));

export default RandomPokemonWithHOC;