import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PokemonDetails() {

    // PokeAPI variables =====================

  const [apiData, setApiData] =useState([]);
  const [pokemonSprite, setPokemonSprite] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [dexNumber, setDexNumber] = useState("")
  const [pokemonSpecies, setPokemonSpecies] = useState("")
  const [pokemonHeight, setPokemonHeight] = useState("")
  const [pokemonWeight, setPokemonWeight] = useState("")

  // Get Pokemon data from API =====================

  useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon/rayquaza')
      .then((res) => {
        // console.log(res.data)

        setPokemonSprite(res.data.sprites.other["official-artwork"].front_shiny)
        setPokemonName(res.data.species.name)
        setDexNumber(res.data.id)
        setPokemonHeight(res.data.height)
        setPokemonHeight(res.data.height)
        setPokemonWeight(res.data.weight)
      })
      .catch((err) => {
          console.log(err);
      })
    }, [])

    // Get species from the API =====================

    useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon-species/384/')
      .then((res) => {
        // console.log(res.data)
        setPokemonSpecies(res.data.genera[7].genus)
      })
      .catch((err) => {
          console.log(err);
      })
  }, [])
  
    return (
      <div className='rounded-container bg-dark-grey'>
        <Row className="align-items-center">
          <Col xs={6}>
            <img src={pokemonSprite} className="pokemon-main-sprite" alt="" />
          </Col>

          <Col xs={6}>
            <h1 className="capitalize mb-20 bold">{pokemonName}</h1>
            <hr/>
            <p className="mb-10 mt-20"><strong>Dex Number:</strong> {dexNumber}</p>
            <p className="mb-10"><strong>Type:</strong></p>
            <p className="capitalize mb-10"><strong>Species:</strong> {pokemonSpecies}</p>
            <p className="mb-10"><strong>Height:</strong> {pokemonHeight}</p>
            <p><strong>Weight:</strong> {pokemonWeight}</p>
          </Col>
        </Row>
      </div>
    )
  }
  
  export default PokemonDetails;