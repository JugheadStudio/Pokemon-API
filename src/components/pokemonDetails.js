import React from 'react';
import { useState, useEffect, useRef } from "react";
import axios from 'axios';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const PokemonDetails = (props) => {

  const newURL = props.parentToChild;

  // PokeAPI variables =====================
  const [pokemonSprite, setPokemonSprite] = useState('')
  const [pokemonName, setPokemonName] = useState('')
  const [dexNumber, setDexNumber] = useState('384')
  const [pokemonType, setPokemonType] = useState('')
  const [pokemonSpecies, setPokemonSpecies] = useState('')
  const [pokemonHeight, setPokemonHeight] = useState('')
  const [pokemonWeight, setPokemonWeight] = useState('')

  const [pokemonTypeOne, setPokemonTypeOne] = useState('')
  const [pokemonTypeTwo, setPokemonTypeTwo] = useState('')

  // Get Pokemon data from API =====================

  useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon/' + newURL)
      .then((res) => {
        // console.log(res.data)
        setPokemonSprite(res.data.sprites.other['official-artwork'].front_default)
        setPokemonName(res.data.species.name)
        setDexNumber(res.data.id)
        setPokemonHeight(res.data.height)
        setPokemonWeight(res.data.weight)

        if (res.data.types.length > 1) {
          setPokemonType(res.data.types[0].type.name + ', ' + res.data.types[1].type.name)
          setPokemonTypeOne(res.data.types[0].type.url.replace('https://pokeapi.co/api/v2/type/', ''))
          setPokemonTypeTwo(res.data.types[1].type.url.replace('https://pokeapi.co/api/v2/type/', ''))
        } else {
          setPokemonType(res.data.types[0].type.name)
          setPokemonTypeOne(res.data.types[0].type.url.replace('https://pokeapi.co/api/v2/type/', ''))
        }

        sendURLToParent(pokemonTypeOne, pokemonTypeTwo);

      })
      .catch((err) => {
          console.log(err);
      })

      axios.get('https://pokeapi.co/api/v2/pokemon-species/' + dexNumber)
      .then((res) => {
        // console.log(res.data)
        setPokemonSpecies(res.data.genera[7].genus)
      })
      .catch((err) => {
          console.log(err);
      })

      function sendURLToParent(url1, url2) {
        props.func(url1,url2)
      }
    }, [newURL, dexNumber, pokemonTypeOne, pokemonTypeTwo, props, pokemonSpecies])


  
    return (
      <div className='rounded-container bg-dark-grey'>
        <Row className='align-items-center'>
          <Col xs={12} md={6} lg={6} className='text-center'>
            <img src={pokemonSprite} className='pokemon-main-sprite' alt='' />
          </Col>

          <Col xs={12} md={6} lg={6} className='xs-text-center pb-25 pt-25'>
            <h1 className='capitalize mb-20 bold'>{pokemonName}</h1>
            <hr/>
            <p className='mb-10 mt-20'><strong>Dex Number:</strong> {dexNumber}</p>
            <p className='mb-10 capitalize'><strong>Type:</strong> {pokemonType}</p>
            <p className='capitalize mb-10'><strong>Species:</strong> {pokemonSpecies}</p>
            <p className='mb-10'><strong>Height:</strong> {pokemonHeight / 10} m</p>
            <p><strong>Weight:</strong> {pokemonWeight / 10} kg</p>
          </Col>
        </Row>
      </div>
    )
  }
  
  export default PokemonDetails;