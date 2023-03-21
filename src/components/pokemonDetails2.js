import React from 'react';

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

  return (
    <div className='rounded-container bg-dark-grey'>
      <Row className='align-items-center'>
        <Col xs={12} md={6} lg={6} className='text-center'>
          <img src={pokemonData.officialArtwork} className='pokemon-main-sprite' alt='' />
        </Col>

        <Col xs={12} md={6} lg={6} className='xs-text-center pb-25 pt-25'>
          <h1 className='capitalize mb-20 bold'>{pokemonData.name}</h1>
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