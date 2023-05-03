import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './pokemonDetails.css';

const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { pokemonId } = useParams();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const types = response.data.types.map(type => type.type.name);
      const abilities = response.data.abilities.map(ability => ability.ability.name);
      const stats = response.data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`);
      const speciesResponse = await axios.get(response.data.species.url);
      const description = speciesResponse.data.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
      setPokemonDetails({
        name: response.data.name,
        image: response.data.sprites?.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types,
        abilities,
        stats,
        description
      });
    };
    fetchPokemonDetails();
  }, [pokemonId]);

  if (!pokemonDetails) {
    return <div className="pokemon-details loading">Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <h1>{pokemonDetails.name}</h1>
      <img src={pokemonDetails.image} alt={pokemonDetails.name} />
      <p>Weight: {pokemonDetails.weight}kg</p>
      <p>Height: {pokemonDetails.height}m</p>
      <p>Types: {pokemonDetails.types.join(', ')}</p>
      <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
      <p>Stats: {pokemonDetails.stats.join(', ')}</p>
      <p>Description: {pokemonDetails.description}</p>
    </div>
  );
};

export default PokemonDetails;