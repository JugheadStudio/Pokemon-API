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
import RadarStats from '../components/radarStats';
import HorizontalBarStats from '../components/horizontalBarStats';
import WeaknessTable from '../components/weaknessTable';
import SearchBar from '../components/searchBar';
import LevelChart from '../components/levelChart';

const Landing = () => {

  const pull_pokemon_name = (pokemonNameChosenFromSearch) => {
    setNewPokemonNameFromSearch(pokemonNameChosenFromSearch)
    // console.log(newPokemonNameFromSearch + " this is from the prop");
  }

  const [pokemonData, setPokemonData] = useState(null);
  const [newPokemonNameFromSearch, setNewPokemonNameFromSearch] = useState(Math.floor(Math.random() * 905))

  useEffect(() => {
    getPokemonData(newPokemonNameFromSearch).then(data => setPokemonData(data));
  }, [newPokemonNameFromSearch]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  return (

    <Col xs={12} xl={10}>
      {/* API info ===================== */}
      <Row className=''>
        <Col xs={12} className='pt-12'>

          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1" className='xs-text-center'>
            <Accordion.Header>About Datamon</Accordion.Header>
              <Accordion.Body>
                <p className='mb-3'>Welcome to Datamon, a one-stop destination for all things Pokémon! Our website utilizes the power of the PokeAPI, a widely-used and comprehensive API that aggregates a wealth of Pokémon-related data, to provide you with detailed insights and captivating visualizations of the Pokémon universe.</p>
                <p className='mb-3'>PokeAPI serves as a reliable source of information for numerous aspects of Pokémon species, including their names, types, abilities, stats, and much more. By harnessing the capabilities of this API, Datamon brings you an engaging experience, allowing you to access all the relevant data for any Pokémon at a glance and utilize this information to enrich your Pokémon journey.</p>
                <p>Explore the fascinating world of Pokémon with Datamon, and discover comprehensive insights and statistics that will enhance your knowledge and appreciation of these beloved creatures.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className='mb-12'>
        <Col xs={12}>
          <div>
            <h2 className="bold xs-text-center">Pokémon Data</h2>
          </div>
        </Col>
      </Row>

      <SearchBar func={pull_pokemon_name}/>

      <Row className="">
        <Col xs={12} md={6} xl={6} xxl={8} className='d-flex'>
          <PokemonDetails pokemonData={pokemonData}/>
        </Col>

        <Col xs={12} md={6} xl={6} xxl={4} className='d-flex'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15 text-center'>EV Stats</h3>
            <RadarStats pokemonData={pokemonData}/>
          </div>
        </Col>

      </Row>

      <Row>
        <Col xs={12} md={6} xl={6} className='d-flex'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15 text-center'>Pokémon Base Stats</h3>
            <p className='mb-15 text-center'>Below is a breakdown of the selected Pokémon's stats.</p>
            <div className='chart-wrapper'>
              <HorizontalBarStats pokemonData={pokemonData}/>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} xl={6} className='d-flex'>
          <WeaknessTable pokemonData={pokemonData}/>
        </Col>
      </Row>

      <Row>
        <Col xs={12} className='d-flex'>
          <div className='rounded-container bg-dark-grey mb-25'>
            <h3 className='bold mb-15 text-center'>Growth Rate</h3>
            <p className='mb-15 text-center'>Below you will find a line chart that shows how much experience this Pokémon needs to level up.</p>
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
              All content is property of &copy;Pokémon 1995-2023 Nintendo/Game Freak 
            </p>

          </div>
        </Col>
      </Row>

    </Col>

  );
}

export default Landing;
