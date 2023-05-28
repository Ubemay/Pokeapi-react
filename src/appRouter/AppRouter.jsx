import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "../pokemonList/PokemonList";
import PokemonDetails from "../pokemonDetails/PokemonDetails";
import RandomPokemon from "../randomPokemon/RandomPokemon";
import SearchResults from "../searchResults/SearchResults";
import "./appRouter.css";

function AppRouter() {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/random-pokemon">Random Pokemon</Link>
          </li>
          <li>
            <input
              type="text"
              placeholder="Search Pokemon"
              value={query}
              onChange={handleSearch}
            />
            {query && <SearchResults query={query} />}
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        <Route path="/random-pokemon" element={<RandomPokemon />} />
      </Routes>
      <footer>This is the footer of the page. (C) Made by Turganov Rustambek.</footer>
    </Router>
  );
}

export default AppRouter;
