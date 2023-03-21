import React from 'react';
import { useState, useEffect } from "react";

// Pokemon data
import { getPokemonData } from '../PokemonData';

// Components
import PokemonDetails from '../components/pokemonDetails';
import RadarStats from '../components/radarStats';
import HorizontalBarStats from '../components/horizontalBarStats';
import PieStats from '../components/pieStats';
import SearchBar from '../components/searchBar';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Compare = () => {

  const pull_pokemon_name = (pokemonNameChosenFromSearch) => {
    setNewPokemonNameFromSearch(pokemonNameChosenFromSearch)
    // console.log(newPokemonNameFromSearch + " this is from the prop");
  }

  const [pokemonData, setPokemonData] = useState(null);
  const [newPokemonNameFromSearch, setNewPokemonNameFromSearch] = useState('rayquaza')

  useEffect(() => {
    getPokemonData(newPokemonNameFromSearch).then(data => setPokemonData(data));
  }, [newPokemonNameFromSearch]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  // console.log(pokemonData);

  return (
    
    <Col xs={12} xl={10}>
      {/* API info ===================== */}
      <Row>
        <Col xs={12} xl={12} className='pt-12'>
          <div className='top-info-bar xs-text-center'>
            <h1 className="mb-15 bold">Pokemon Comparison</h1>
            <p className="mb-10">Comparing Pokemon stats and abilities can be a valuable tool for trainers looking to build powerful teams. By using data and charts, we can gain a deeper understanding of the unique strengths and weaknesses of each Pokemon.</p>
            <p>One way to compare Pokemon stats is by using a radar chart, which displays a Pokemon's base stats in categories such as Attack, Defense, Speed, Special Attack, Special Defense, and HP. This chart allows us to quickly see how a Pokemon stacks up against others in different categories and can help trainers decide which Pokemon to add to their team based on their desired attributes.</p>
          </div>
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
          <SearchBar func={pull_pokemon_name}/>     
          <PokemonDetails pokemonData={pokemonData}/>
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
                <RadarStats pokemonData={pokemonData}/>
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
                <HorizontalBarStats pokemonData={pokemonData}/>
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
          <PieStats pokemonData={pokemonData}/>
        </Col>
      </Row>

    </Col>


  );
}

export default Compare;