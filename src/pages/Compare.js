import React from 'react';
import { useState, useEffect } from "react";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

// Pokemon data
import { getPokemonData } from '../PokemonData';
import { getPokemonData2 } from '../PokemonData2';

// Components
import SearchBar from '../components/searchBar';
import PokemonDetails from '../components/pokemonDetails';
import RadarStats from '../components/radarStats';
import HorizontalBarStats from '../components/horizontalBarStats';
import PieStats from '../components/pieStats';

// Comparison Components
import SearchBarCompare from '../components/searchBarCompare';
import PokemonDetails2 from '../components/pokemonDetails2';
import HorizontalBarStatsCompare from '../components/horizontalBarStatsCompare';
import RadarStatsCompare from '../components/radarStatsCompare'
import PieStatsCompare from '../components/pieStatsCompare';


const Compare = () => {

  const pull_pokemon_name = (pokemonNameChosenFromSearch) => {
    setNewPokemonNameFromSearch(pokemonNameChosenFromSearch)
    // console.log(newPokemonNameFromSearch + " this is from the prop");
  }

  const pull_pokemon_name_2 = (pokemonNameChosenFromSearch2) => {
    setNewPokemonNameFromSearch2(pokemonNameChosenFromSearch2)
    // console.log(newPokemonNameFromSearch + " this is from the prop");
  }

  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonData2, setPokemonData2] = useState(null);
  const [newPokemonNameFromSearch, setNewPokemonNameFromSearch] = useState(Math.floor(Math.random() * 1008))
  const [newPokemonNameFromSearch2, setNewPokemonNameFromSearch2] = useState(Math.floor(Math.random() * 1008))

  useEffect(() => {
    getPokemonData(newPokemonNameFromSearch).then(data => setPokemonData(data));
    getPokemonData2(newPokemonNameFromSearch2).then(data2 => setPokemonData2(data2));
  }, [newPokemonNameFromSearch, newPokemonNameFromSearch2]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  if (!pokemonData2) {
    return <p>Loading...</p>;
  }

  // console.log(pokemonData);

  return (
    
    <Col xs={12} xl={10}>
      {/* API info ===================== */}
      <Row>
        <Col xs={12} xl={12} className='pt-12'>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1" className='xs-text-center'>
              <Accordion.Header>Pokemon Comparison</Accordion.Header>
              <Accordion.Body>
                <p>Comparing Pokemon stats and abilities can be a valuable tool for trainers looking to build powerful teams. By using data and charts, we can gain a deeper understanding of the unique strengths and weaknesses of each Pokemon.</p>
                <p>One way to compare Pokemon stats is by using a radar chart, which displays a Pokemon's base stats in categories such as Attack, Defense, Speed, Special Attack, Special Defense, and HP. This chart allows us to quickly see how a Pokemon stacks up against others in different categories and can help trainers decide which Pokemon to add to their team based on their desired attributes.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={6}>
          <h2 className="mb-15 bold text-center">Pokemon 1</h2>
          <SearchBar func={pull_pokemon_name}/>      
          <PokemonDetails pokemonData={pokemonData}/>
        </Col>

        <Col xs={12} xl={6}>
          <h2 className="mb-15 bold text-center">Pokemon 2</h2>          
          <SearchBarCompare func={pull_pokemon_name_2}/>     
          <PokemonDetails2 pokemonData={pokemonData2}/>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={6} className=' text-center'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15'>Pokemon 1 Stats Overview</h3>
            <div className='w-100 text-center '>
              <div className='radar-size m-auto'>
                <RadarStats pokemonData={pokemonData}/>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={12} xl={6} className=' text-center'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15'>Pokemon 2 Stats Overview</h3>
            <div className='w-100 text-center '>
              <div className='radar-size m-auto'>
                <RadarStatsCompare pokemonData={pokemonData2}/>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={6} className='text-center'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15'>Pokemon 1 Base Stats</h3>
            <div className='w-100 text-center '>
              <div className='w-75 m-auto chart-wrapper '>
                <HorizontalBarStats pokemonData={pokemonData}/>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={12} xl={6} className='text-center'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15'>Pokemon 2 Base Stats</h3>
            <div className='w-100 text-center '>
              <div className='w-75 m-auto chart-wrapper '>
                <HorizontalBarStatsCompare pokemonData={pokemonData2}/>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={6}>
          <PieStats pokemonData={pokemonData}/>
        </Col>

        <Col xs={12} xl={6}>
          <PieStatsCompare pokemonData={pokemonData2}/>
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

export default Compare;