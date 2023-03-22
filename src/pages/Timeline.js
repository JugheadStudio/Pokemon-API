import React from 'react';
import { useState, useEffect } from "react";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Pokemon data
import { getPokemonData } from '../PokemonData';

// Components
import PokemonDetails from '../components/pokemonDetails';
import LevelChart from '../components/levelChart';
import SearchBar from '../components/searchBar';

const Timeline = () => {

  const pull_pokemon_name = (pokemonNameChosenFromSearch) => {
    setNewPokemonNameFromSearch(pokemonNameChosenFromSearch)
    // console.log(newPokemonNameFromSearch + " this is from the prop");
  }

  const [pokemonData, setPokemonData] = useState(null);
  const [newPokemonNameFromSearch, setNewPokemonNameFromSearch] = useState(Math.floor(Math.random() * 1008))

  useEffect(() => {
    getPokemonData(newPokemonNameFromSearch).then(data => setPokemonData(data));
  }, [newPokemonNameFromSearch]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }
  return (
    
    <Col xs={12} xl={10}>
      <Row>
      <Col xs={12} xl={12} className='pt-12'>
          <div className='top-info-bar xs={12} xs-text-center'>
            <h1 className="bold">Timeline</h1>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12}>
          <div className="input-box">
          <SearchBar func={pull_pokemon_name}/>               
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={8} className='d-flex'>
        <PokemonDetails pokemonData={pokemonData}/>
        </Col>

        <Col xs={12} xl={4} className='d-flex'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15 text-center'>Evolution</h3>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className='d-flex'>
          <LevelChart pokemonData={pokemonData}/>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className='d-flex'>
          <LevelChart pokemonData={pokemonData}/>
        </Col>
      </Row>

    </Col>
    
  );
}

export default Timeline;