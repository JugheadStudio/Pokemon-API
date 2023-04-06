import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const SearchBar = ({ func }) => {

  // Declare state variables for the search bar
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState(null);
  const [userSearchInput, setUserSearchInput] = useState('');

  // Fetch all the pokemon names from the API
  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=905'
        );

        // Get the ID and name of each pokemon
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

      // If the user hasn't typed anything, don't filter the results
      if (input === '') {
        setFilteredPokemon(null);
      } else {

        // Convert the user's input to lowercase
        const searchInput = input.toLowerCase();

        // Filter the pokemon names based on the user's input
        const filtered = allPokemon.filter((pokemon) => {
          return (
            pokemon.name.includes(searchInput) || // check if the name includes the search input
            pokemon.id.includes(searchInput) // check if the ID includes the search input
          );
        });

        // If no pokemon are found, display a message that says no pokemon found
        if (filtered.length === 0) {
          setFilteredPokemon([{ name: "No Pokémon found", types: [], dexNumber: null }]);
        } else {

          // Get the pokemon name, types, and dex number and store them in an array
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

  // Handle the user's input
  const handleUserInput = useCallback((event) => {
    setUserSearchInput(event.target.value);
  }, []);

  // Update the pokemon chosen from the search results, clear the search results, clear the user's input and push the new pokemon to the parent using props
  const updatePokemonChosenFromSearch = useCallback(
    (name) => {
      func(name);
      setFilteredPokemon(null);
      setUserSearchInput('');
    },
    [func]
  );

  // Map the filtered pokemon to a list of results
  const searchResults =
  filteredPokemon &&
  filteredPokemon.length > 0 &&
  filteredPokemon.map(({ name, displayName, types, dexNumber }) => (
    // If the user clicks on a pokemon, update the pokemon chosen from the search results
    <Row
      key={name}
      onClick={
        name !== "No Pokémon found"
          ? () => updatePokemonChosenFromSearch(name)
          : undefined
      }
    >
      {/* If the pokemon is not found, display a message that says no pokemon found */}
      {name !== "No Pokémon found" ? (
        <>
          <Col xs={2} lg={1} className="text-center">
            {dexNumber}
          </Col>
          <Col xs={2} lg={2}>
            {dexNumber && (
              <img
                alt={`${name} sprite`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexNumber}.png`}
              />
            )}
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
      ) : ( // If the pokemon is not found, display a message that says no pokemon found
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
