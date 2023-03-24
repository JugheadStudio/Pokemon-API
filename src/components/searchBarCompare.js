import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SearchBar = ({ func }) => {
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
      const filterResults = async (input) => {
        const filtered = allPokemon.filter((name) =>
          input.split(' ').every((word) => name.includes(word.toLowerCase()))
        );
        
        if (filtered.length === 0) {
          setFilteredPokemon([{ name: "No pokemon with that name", types: [], dexNumber: null }]);
        } else {
          const results = await Promise.all(filtered.slice(0, 5).map(async (name) => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const types = response.data.types.map((pokemonType) => pokemonType.type.name);
            const dexNumber = response.data.id;
            const displayName = name; // get everything before the hyphen
            return { name, displayName, types, dexNumber };
          }));
          
          setFilteredPokemon(results);
        }
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
  filteredPokemon.map(({ name, displayName, types, dexNumber }) => (
    <Row key={name} onClick={() => updatePokemonChosenFromSearch(name)}>
      {name !== "No pokemon with that name" ? (
        <>
          <Col xs={2} lg={2}>
            <img
              alt={`${name} sprite`}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                allPokemon.indexOf(name) + 1
              }.png`}
            />
          </Col>
          <Col xs={2} lg={1} className="text-center">
            {dexNumber}
          </Col>
          <Col xs={3} lg={5} className="text-center">
            {displayName}
          </Col>
          <Col xs={5} lg={4} className="text-center">
            {types.map((type) => (
              <span key={type} className={`pokemon-type ${type}`}>
                {type}
              </span>
            ))}
          </Col>
        </>
      ) : (
        <Col xs={12} lg={12} className="text-center">
          {name}
        </Col>
      )}
    </Row>
  ));

  return (
    <Row>
      <Col xs={12} xl={12}>
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

export default SearchBar;
