import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './pokemonDetails.css';

const withPokemonDetails = (WrappedComponent) => {
  return function WithPokemonDetails(props) {
    const [pokemonDetails, setPokemonDetails] = useState(null);
    const [error, setError] = useState(null);
    const { pokemonId } = useParams();

    useEffect(() => {
      const fetchPokemonDetails = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          const transformedData = transformPokemonData(response.data);
          setPokemonDetails(transformedData);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchPokemonDetails();
    }, [pokemonId]);

    useEffect(() => {
      // ComponentDidUpdate logic
      // Perform specific actions when pokemonDetails state changes
      console.log('PokemonDetails state updated:', pokemonDetails);

      // Cleanup function (ComponentWillUnmount)
      return () => {
        console.log('PokemonDetails component unmounted');
        // Additional cleanup tasks can be performed here
      };
    }, [pokemonDetails]);

    const transformPokemonData = (data) => {
      const types = data.types.map(type => type.type.name);
      const abilities = data.abilities.map(ability => ability.ability.name);
      const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`);

      return {
        name: data.name,
        image: data.sprites?.front_default,
        weight: data.weight,
        height: data.height,
        types,
        abilities,
        stats,
      };
    };

    if (error) {
      return <ErrorDisplay message={error} />;
    }

    if (!pokemonDetails) {
      return <div className="pokemon-details loading">Loading...</div>;
    }

    return <WrappedComponent pokemonDetails={pokemonDetails} {...props} />;
  };
};

const PokemonDetails = ({ pokemonDetails }) => {
  return (
    <div className="pokemon-details">
      <h1>{pokemonDetails.name}</h1>
      <img src={pokemonDetails.image} alt={pokemonDetails.name} />
      <p>Weight: {pokemonDetails.weight}kg</p>
      <p>Height: {pokemonDetails.height}m</p>
      <p>Types: {pokemonDetails.types.join(', ')}</p>
      <p>Abilities: {pokemonDetails.abilities.join(', ')}</p>
      <p>Stats: {pokemonDetails.stats.join(', ')}</p>
    </div>
  );
};

const ErrorDisplay = ({ message }) => (
  <div className="pokemon-details error">
    <p>Error: {message}</p>
  </div>
);

// Wrap the PokemonDetails component with the withPokemonDetails HOC
const PokemonDetailsWithEnhancement = withPokemonDetails(PokemonDetails);

export default PokemonDetailsWithEnhancement;
