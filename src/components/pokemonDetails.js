import React from 'react';
import { useState } from "react";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PokemonDetails = (props) => {

  const pokemonData = props.pokemonData;

  const [isShiny, setIsShiny] = useState(false);

  const handleToggle = () => {
    setIsShiny(!isShiny);
  };

  let pokemonSprite = '';

  if (isShiny) {
    pokemonSprite = pokemonData.officialShiny;
  } else {
    pokemonSprite = pokemonData.officialArtwork;
  }

  
  let pokemonName = pokemonData.name.toLowerCase(); // Convert the name to lowercase

  // Check if the name should not be split
  const excludeNames = ["chi-yu", "ting-lu", "chien-pao", "wo-chien", "iron-leaves", "iron-valiant", "roaring-moon", "iron-thorns", "iron-moth", "iron-jugulis", "iron-hands", "iron-bundle", "iron-treads", "sandy-shocks", "slither-wing", "flutter-mane", "brute-bonnet", "scream-tail", "great-tusk", "tapu-fini", "tapu-bulu", "tapu-lele", "tapu-koko", "kommo-o", "hakamo-o", "jangmo-o", "type-null", "porygon-z", "mime-jr", "ho-oh", "mr-mime"];

  if (excludeNames.includes(pokemonName)) {
    // Do nothing
  } else {
    const nameParts = pokemonName.split('-'); // Split the name by hyphen
    pokemonName = nameParts[0]; // Get the first part of the name
  }

  // Map through the types array to create a span element for each type
  const pokemonTypes = pokemonData.types.map((type) => (
    <span key={type.type} className={`pokemon-type ${type.type}`}>
      {type.type}
    </span>
  ));

  return (
    <div className='rounded-container bg-dark-grey'>
      <Row className='align-items-center'>
        <Col xs={12} md={6} lg={6} className='text-center'>
          <img src={pokemonSprite} className='pokemon-main-sprite' alt={pokemonName + ' official artwork'} />
        </Col>

        <Col xs={12} md={6} lg={6} className='xs-text-center pb-25 pt-25'>

          <div className='d-flex w-100'>
            <div className='w-50'>
              <h1 className='capitalize bold'>{pokemonName}</h1>
            </div>
            <div className='w-50 d-flex justify-content-end'>
              <div className="form-check form-switch">
                <input className='form-check-input' type="checkbox" role="switch" id="shinySwitch" onChange={handleToggle}/>
                <label className="form-check-label">Shiny</label>
              </div>
            </div>
          </div>
          
          <hr/>
          <p className='mb-10 mt-20'><strong>Dex Number:</strong> {pokemonData.dexNumber}</p>
          <p className='capitalize mb-10'><strong>Type:</strong> {pokemonTypes}</p>
          <p className='capitalize mb-10'><strong>Species:</strong> {pokemonData.species}</p>
          <p className='mb-10'><strong>Height:</strong> {pokemonData.height} m</p>
          <p><strong>Weight:</strong> {pokemonData.weight} kg</p>
        </Col>
      </Row>
    </div>
  )
}
  
export default PokemonDetails;
