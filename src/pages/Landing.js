import React from 'react';
import { useState, useEffect } from "react";

// Components
import PokemonDetails from '../components/pokemonDetails';
import RadarStats from '../components/radarStats';
import HorizontalBarStats from '../components/horizontalBarStats';
import WeaknessTable from '../components/weaknessTable';
import SearchBar from '../components/searchBar';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Landing = () => {

  const [dataToChild, setdataToChild] = useState('rayquaza')
  const [urlOneToChild, setUrlOneToChild] = useState('16')
  const [urlTwoToChild, setUrlTwoToChild] = useState('3')

  const pull_pokemon_name = (data) => {
    setdataToChild(data)
    // console.log(dataToChild + " this is from the prop");
  }

  const pull_pokemon_type_url = (url1, url2) => {
    setUrlOneToChild(url1)
    setUrlTwoToChild(url2)
  }

  return (

    <Col xs={12} md={6} xl={10}>
      {/* API info ===================== */}
      <Row className=''>
        <Col xs={12} md={6} xl={12} className='pt-12'>
          <div className='top-info-bar xs-text-center'>
            <h1 className="mb-15 bold">About the API</h1>
            <p className="mb-10">Below you will find data pulled from the PokeAPI that are being used to create informative charts that display various aspects of the Pokemon universe.</p>
            <p>The PokeAPI provides a wealth of information about different Pokemon species, including their names, types, abilities, stats, and more. By leveraging this data, you will be able to see all the relevant data for any Pokemon at a glance and use it to your advantage.</p>
          </div>
        </Col>
      </Row>

      <Row className='mb-12'>
        <Col xs={12} md={6} xl={12}>
          <div>
            <h2 className="bold xs-text-center">Pokemon Data</h2>
          </div>
        </Col>
      </Row>

      <SearchBar func={pull_pokemon_name}/>

      <Row className="">
        <Col xs={12} xl={6} xxl={8} className='d-flex'>
          <PokemonDetails parentToChild={dataToChild} func={pull_pokemon_type_url}/>
        </Col>

        <Col xs={12} xl={6} xxl={4} className='d-flex'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15 text-center'>Stats Chart</h3>
            <RadarStats parentToChild={dataToChild}/>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6} xl={6} className='d-flex '>
          <div className='rounded-container bg-dark-grey mb-12-reset'>
            <h3 className='bold mb-15 text-center'>Pokemon Stats</h3>
            <p className='mb-15 text-center'>Below is a breakdown of the selected Pokemon's stats.</p>
            <div className='chart-wrapper'>
              <HorizontalBarStats parentToChild={dataToChild}/>
            </div>
          </div>
        </Col>

        <Col xs={12} md={6} xl={6} className='d-flex'>
          <WeaknessTable  parentToChild={dataToChild} typeUrlOneToChild={urlOneToChild} typeUrlTwoToChild={urlTwoToChild}/>
        </Col>
      </Row>

    </Col>

  );
}

export default Landing;
