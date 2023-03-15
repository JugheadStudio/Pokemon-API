import { useState, useEffect } from "react";
import axios from "axios";

// Components
import WeaknessTable from '../components/weaknessTable';
import RadarStats from '../components/radarStats';
import PokemonDetails from '../components/pokemonDetails';
import PokemonBarStats from '../components/pokemonBarStats';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Landing() {

  return (

    <Col xs={10}>
      {/* API info ===================== */}
      <Row className='mb-25'>
        <Col xs={12} className='pt-12'>
          <div className='top-info-bar'>
            <h1 className="mb-15 bold">About the API</h1>
            <p className="mb-10">Below you will find data pulled from the PokeAPI that are being used to create informative charts that display various aspects of the Pokemon universe.</p>
            <p>The PokeAPI provides a wealth of information about different Pokemon species, including their names, types, abilities, stats, and more. By leveraging this data, you will be able to see all the relevant data for any Pokemon at a glance and use it to your advantage.</p>
          </div>
        </Col>
      </Row>

      <Row className='mb-12'>
        <Col xs={12}>
          <div>
            <h2 className="bold">Pokemon Data</h2>
          </div>
        </Col>
      </Row>

      <Row className='mb-12'>
        <Col xs={12}>
          <div class="input-box">
            <input type="text" class="search-bar" placeholder="Type Pokemon name"/>                  
          </div>
        </Col>
      </Row>

      <Row className="mb-25">
        <Col xs={8} className='d-flex'>
          <PokemonDetails/>
        </Col>

        <Col xs={4} className='d-flex'>
          <RadarStats/>
        </Col>
      </Row>

      <Row className="pb-12">
        <Col xs={6} className='d-flex'>
          <PokemonBarStats/>
        </Col>

        <Col xs={6} className='d-flex'>
          <WeaknessTable/>
        </Col>
      </Row>

    </Col>

  );
}

export default Landing;
