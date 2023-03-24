import React from 'react';
import { useState, useEffect } from "react";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

// Pokemon data
import { getPokemonData } from '../PokemonData';

// Components
import PokemonDetails from '../components/pokemonDetails';
import LevelChart from '../components/levelChart';
import SearchBar from '../components/searchBar';

const Timeline = () => {

  const pull_pokemon_name = (pokemonNameChosenFromSearch) => {
    setNewPokemonNameFromSearch(pokemonNameChosenFromSearch)
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
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1" className='xs-text-center'>
            <Accordion.Header>Timeline</Accordion.Header>
              <Accordion.Body>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati vel porro deleniti, fuga ipsum illo? Hic voluptatem eius, voluptatum veniam minus officiis iusto quisquam vel possimus, itaque sed deserunt distinctio.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
            <p className='text-center mb-25'>Click on the evolution sprites to load Pokemon detials.</p>
            <div className='evolutionContainer'>

              <Row>
                <Col xs={6}><p><strong>Evolves From</strong></p></Col>
                <Col xs={6}><p><strong>Evolves Into</strong></p></Col>
              </Row>

              <Row>
                <Col xs={6}>
                  {pokemonData.evolvesFrom.spriteUrl && pokemonData.evolvesFrom.spriteUrl !== 'null' && pokemonData.evolvesFrom.spriteUrl !== 'https://pokeapi.co/api/v2/pokemon/undefined' &&
                    <img src={pokemonData.evolvesFrom.spriteUrl} alt="" onClick={() => setNewPokemonNameFromSearch(pokemonData.evolvesFrom.name)}/>
                  }
                </Col>
                <Col xs={6}>
                  {pokemonData.evolvesTo.spriteUrl && pokemonData.evolvesTo.spriteUrl !== 'null' && pokemonData.evolvesTo.spriteUrl !== 'https://pokeapi.co/api/v2/pokemon/undefined' &&
                    <img src={pokemonData.evolvesTo.spriteUrl} alt="" onClick={() => setNewPokemonNameFromSearch(pokemonData.evolvesTo.name)}/>
                  }
                </Col>
              </Row>

              <Row>
                <Col xs={6}><p>{pokemonData.evolvesFrom.name}</p></Col>
                <Col xs={6}><p>{pokemonData.evolvesTo.name}</p></Col>
              </Row>

            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className='d-flex'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15 text-center'>Growth Rate</h3>
            <p className='mb-15 text-center'>Below you will find a line chart that shows how much experience this pokemon needs to level up.</p>
            <LevelChart pokemonData={pokemonData}/>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className='d-flex'>
          <div className='rounded-container bg-dark-grey mb-12-reset'>
            <h3 className='bold mb-15 text-center'>Growth Rate</h3>
            <p className='mb-15 text-center'>Below you will find a line chart that shows how much experience this pokemon needs to level up.</p>
            <LevelChart pokemonData={pokemonData}/>
          </div>
        </Col>
      </Row>

    </Col>
    
  );
}

export default Timeline;