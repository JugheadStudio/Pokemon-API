import { useState, useEffect } from "react";
import axios from "axios";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Landing() {

  const [apiData, setApiData] =useState([]);
  const [pokemonSprite, setPokemonSprite] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [dexNumber, setDexNumber] = useState("")
  const [pokemonSpecies, setPokemonSpecies] = useState("")
  const [pokemonHeight, setPokemonHeight] = useState("")
  const [pokemonWeight, setPokemonWeight] = useState("")

  useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon/rayquaza')
      .then((res) => {
        // console.log(res.data)

        setPokemonSprite(res.data.sprites.other["official-artwork"].front_default)
        setPokemonName(res.data.species.name)
        setDexNumber(res.data.id)
        setPokemonHeight(res.data.height)
        setPokemonWeight(res.data.weight)
      })
      .catch((err) => {
          console.log(err);
      })
  }, [])

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

    <Col xs={10}>
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
            <h2 className="bold">Pokedex Data</h2>
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

      <Row>
        <Col xs={8}>
          <div className='rounded-container gb-dark-grey'>
            <Row className="align-items-center">
              <Col xs={6}>
                <img src={pokemonSprite} className="pokemon-main-sprite" alt="" />
              </Col>

              <Col xs={6}>
                <h1 className="capitalize mb-20 bold">{pokemonName}</h1>
                <hr />
                <p className="mb-10"><strong>Dex Number:</strong> {dexNumber}</p>
                <p className="capitalize mb-10"><strong>Species:</strong> {pokemonSpecies}</p>
                <p className="mb-10"><strong>Height:</strong> {pokemonHeight}</p>
                <p><strong>Weight:</strong> {pokemonWeight}</p>
              </Col>
            </Row>
          </div>
        </Col>

        <Col xs={4}>
          <div className='rounded-container gb-dark-grey'>
            <h1>content here</h1>
          </div>
        </Col>
      </Row>

    </Col>

  );
}

export default Landing;
