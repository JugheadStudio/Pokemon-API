import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SearchBarCompare = ({ func }) => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const [userSearchInput, setUserSearchInput] = useState('');

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1008'
        );
        const names = response.data.results.map((result) => result.name);
        setAllPokemon(names);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonNames();
  }, []);

  useEffect(() => {
    if (userSearchInput.length > 0) {
      const filterResults = (input) => {
        const filtered = allPokemon.filter((name) =>
          input.split(' ').every((word) => name.includes(word.toLowerCase()))
        );
        setFilteredPokemon(filtered.slice(0, 5));
      };

      filterResults(userSearchInput);
    } else {
      setFilteredPokemon(null);
    }
  }, [allPokemon, userSearchInput]);

  const handleUserInput = useCallback((event) => {
    setUserSearchInput(event.target.value);
  }, []);

  const updatePokemonChosenFromSearch = useCallback(
    (name) => {
      func(name);
      setFilteredPokemon(null);
    },
    [func]
  );

  const searchResults =
  filteredPokemon && filteredPokemon.length > 0 &&
  filteredPokemon.map((name) => (
      <Row key={name} onClick={() => updatePokemonChosenFromSearch(name)}>
        <Col xs={2}>
          <img
            alt={`${name} sprite`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              allPokemon.indexOf(name) + 1
            }.png`}
          />
        </Col>
        <Col xs={5}>{name}</Col>
        <Col xs={5}>{`${name}'s type`}</Col>
      </Row>
    ));

  return (
    <Row>
      <Col xs={12}>
        <div className="input-box">
          <input type="text" className={`search-bar ${userSearchInput && 'has-value'}`} placeholder="Search for Pokemon" value={userSearchInput} onChange={handleUserInput}/>
          {searchResults !== null && (
            <div id="searchResults" className="searchBarResults">
              {searchResults}
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default SearchBarCompare;
