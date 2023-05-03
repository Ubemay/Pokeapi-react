import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonList from '../pokemonList/PokemonList';
import PokemonDetails from '../pokemonDetails/PokemonDetails';
import RandomPokemon from '../randomPokemon/RandomPokemon';
import './appRouter.css';

function AppRouter() {
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
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        <Route path="/random-pokemon" element={<RandomPokemon />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
