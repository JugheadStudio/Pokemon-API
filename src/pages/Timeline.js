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
                {pokemonData.evolutionData.evolvesFrom.spriteUrl !== 'None' && 
                  <img className='pointer' 
                  src={pokemonData.evolutionData.evolvesFrom.spriteUrl} 
                  alt={pokemonData.evolutionData.evolvesFrom.name + ' sprite'} 
                  onClick={() => setNewPokemonNameFromSearch(pokemonData.evolutionData.evolvesFrom.fullName)}/>
                }
                </Col>
                <Col xs={6}>
                  {pokemonData.evolutionData.evolvesTo.spriteUrl !== 'None' && 
                    <img className='pointer' 
                    src={pokemonData.evolutionData.evolvesTo.spriteUrl} 
                    alt={pokemonData.evolutionData.evolvesTo.name + ' sprite'} 
                    onClick={() => setNewPokemonNameFromSearch(pokemonData.evolutionData.evolvesTo.fullName)}/>
                  }
                </Col>
              </Row>

              <Row>
                <Col xs={6}>
                  {pokemonData.evolutionData.evolvesFrom.name !== 'None' ? 
                    <p className='pointer' onClick={() => setNewPokemonNameFromSearch(pokemonData.evolutionData.evolvesFrom.fullName)}>
                      {pokemonData.evolutionData.evolvesFrom.name.charAt(0).toUpperCase() + pokemonData.evolutionData.evolvesFrom.name.slice(1)}
                    </p>
                    :
                    <p>None</p>
                  }
                </Col>

                <Col className='pointer' xs={6}>
                  {pokemonData.evolutionData.evolvesTo.name !== 'None' ? 
                    <p onClick={() => setNewPokemonNameFromSearch(pokemonData.evolutionData.evolvesTo.fullName)}>
                      {pokemonData.evolutionData.evolvesTo.name.charAt(0).toUpperCase() + pokemonData.evolutionData.evolvesTo.name.slice(1)}
                    </p>
                    :
                    <p>None</p>
                  }
                </Col>
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
        <Col xs={12} className='d-flex'>
          <div className='disclaimer rounded-container bg-dark-grey mb-12-reset'>
            <p>
              Using <a href="https://pokeapi.co/">PokeAPI V2</a> | Designed by <span>Jughead Studio</span>
              <br />
              All content is property of &copy;Pokemon 1995-2023 Nintendo/Game Freak 
            </p>

          </div>
        </Col>
      </Row>

    </Col>
    
  );
}

export default Timeline;