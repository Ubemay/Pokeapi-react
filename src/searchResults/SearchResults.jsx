import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './SearchResults.css';

function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=50&offset=0`
        );
        const pokemons = response.data.results.map((result) => ({
          name: result.name,
          url: result.url,
        }));
        setResults(pokemons);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const filteredResults = results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <>
      <ul>
        {filteredResults.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${pokemon.url.split("/")[6]}`}>
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const ErrorDisplay = ({ message }) => (
  <div className="search-results error">
    <p>Error: {message}</p>
  </div>
);

export default SearchResults;
