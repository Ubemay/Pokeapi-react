import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './randomPokemon.css';

const RandomPokemon = () => {
  const [randomPokemon, setRandomPokemon] = useState(null);

  const fetchRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898);
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    setRandomPokemon(response.data);
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

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

export default RandomPokemon;
