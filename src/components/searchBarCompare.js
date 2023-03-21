import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SearchBarCompare = (props) => {
  // state to store all pokemon and the pokemon that match the user search input
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  // state to store user search input
  const [userSearchInput, setUserSearchInput] = useState('');

  // fetch all pokemon names from PokeAPI on component mount
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1008')
      .then((res) => {
        // extract pokemon names from response data and set allPokemon state
        const names = res.data.results.map((result) => result.name);
        setAllPokemon(names);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // filter allPokemon whenever userSearchInput changes
  useEffect(() => {
    filterThroughResults(userSearchInput);
  }, [userSearchInput]);

  // function to filter allPokemon based on user search input
  const filterThroughResults = useCallback((input) => {
    const filtered = allPokemon.filter((name) =>
      // split user input by spaces and check that every word appears in the pokemon name
      input.split(' ').every((word) => name.includes(word.toLowerCase()))
    );
    // set filteredPokemon state to first 5 matches
    setFilteredPokemon(filtered.slice(0, 5));
  }, [allPokemon]);

  // function to update parent state with selected pokemon and clear filteredPokemon state
  const updatePokemonChosenFromSearch = useCallback((e) => {
    props.func(e.target.innerHTML);
    setFilteredPokemon([]);
  }, [props]);

  // function to update userSearchInput state when user types in search bar
  const handleUserInput = (event) => {
    setUserSearchInput(event.target.value);
  };

  // JSX to render search results table
  const searchResults = (
    <table id="searchBarTable2">
      <tbody>
        {filteredPokemon.map((name) => (
          <tr key={name} onClick={updatePokemonChosenFromSearch}>
            <td value={name}>{name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Row>
      <Col xs={12} md={6} xl={12}>
        <div className="input-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Type Pokemon name"
            value={userSearchInput}
            onChange={handleUserInput}
          />
          {filteredPokemon.length > 0 && searchResults}
        </div>
      </Col>
    </Row>
  );
};

export default SearchBarCompare;
