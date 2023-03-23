import React from 'react';
import { useState} from "react";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PokemonDetails = (props) => {

  const pokemonData = props.pokemonData
    
  let pokemonType = '';

  if (pokemonData.type.length > 1) {
    pokemonType = pokemonData.type[0] + ', ' + pokemonData.type[1];
  } else {
    pokemonType = pokemonData.type[0];
  }

  const [isShiny, setIsShiny] = useState(false);

  const handleToggle = () => {
    setIsShiny(!isShiny);
  };

  let pokemonSprite = ''

  if (isShiny) {
    pokemonSprite = pokemonData.officialShiny
  } else {
    pokemonSprite = pokemonData.officialArtwork
  }

  const nameParts = pokemonData.name.split('-'); // Split the name by hyphen
  const pokemonName = nameParts[0]; // Get the first part of the name


  return (
    <div className='rounded-container bg-dark-grey'>
      <Row className='align-items-center'>
        <Col xs={12} md={6} lg={6} className='text-center'>
          <img src={pokemonSprite} className='pokemon-main-sprite' alt='' />
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
          <p className='mb-10 capitalize'><strong>Type:</strong> {pokemonType}</p>
          <p className='capitalize mb-10'><strong>Species:</strong> {pokemonData.species}</p>
          <p className='mb-10'><strong>Height:</strong> {pokemonData.height} m</p>
          <p><strong>Weight:</strong> {pokemonData.weight} kg</p>
        </Col>
      </Row>
    </div>
  )
}
  
  export default PokemonDetails;