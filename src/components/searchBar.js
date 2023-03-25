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

        const dexEntry = response.data.results.map((result) => {
          const dexLink = result.url;
          const parts = dexLink.split('/');
          const id = parts[parts.length - 2];
          return { id, name: result.name, url: result.url };
        });
        setAllPokemon(dexEntry);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonNames();
  }, []);

  useEffect(() => {
    const filterResults = async (input) => {
      if (input === '') {
        setFilteredPokemon(null);
      } else {
        const searchInput = input.toLowerCase();
        const filtered = allPokemon.filter((pokemon) => {
          return (
            pokemon.name.includes(searchInput) || // check if the name includes the search input
            pokemon.id.includes(searchInput) // check if the ID includes the search input
          );
        });

        if (filtered.length === 0) {
          setFilteredPokemon([{ name: "No pokemon found", types: [], dexNumber: null }]);
        } else {
          const results = await Promise.all(filtered.slice(0, 5).map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            const types = response.data.types.map((pokemonType) => pokemonType.type.name);
            const dexNumber = response.data.id;
            const displayName = pokemon.name; // get everything before the hyphen
            return { name: pokemon.name, displayName, types, dexNumber };
          }));

          setFilteredPokemon(results);
        }
      }
    };

    filterResults(userSearchInput);
  }, [allPokemon, userSearchInput]);

  const handleUserInput = useCallback((event) => {
    setUserSearchInput(event.target.value);
  }, []);

  const updatePokemonChosenFromSearch = useCallback(
    (name) => {
      func(name);
      setFilteredPokemon(null);
      setUserSearchInput('');
    },
    [func]
  );

  const searchResults =
  filteredPokemon && filteredPokemon.length > 0 &&
  filteredPokemon.map(({ name, displayName, types, dexNumber }) => (
    <Row key={name} onClick={() => updatePokemonChosenFromSearch(name)}>
      {name !== "No pokemon with that name" ? (
        <>
          <Col xs={2} lg={1} className="text-center">
            {dexNumber}
          </Col>
          <Col xs={2} lg={2}>
          <img alt={`${name} sprite`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`}
          />
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
