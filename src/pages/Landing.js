import { useState, useEffect } from "react";
import axios from "axios";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Chart JS =====================
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
);

function Landing() {

  // PokeAPI variables =====================

  const [apiData, setApiData] =useState([]);
  const [pokemonSprite, setPokemonSprite] = useState("")
  const [pokemonName, setPokemonName] = useState("")
  const [dexNumber, setDexNumber] = useState("")
  const [pokemonSpecies, setPokemonSpecies] = useState("")
  const [pokemonHeight, setPokemonHeight] = useState("")
  const [pokemonWeight, setPokemonWeight] = useState("")
  const [pokemonHpStat, setpokemonHpStat] = useState("")
  const [pokemonAtkStat, setpokemonAtkStat] = useState("")
  const [pokemonDefStat, setpokemonDefStat] = useState("")
  const [pokemonSpAtkStat, setpokemonSpAtkStat] = useState("")
  const [pokemonSpDefStat, setpokemonSpDefStat] = useState("")
  const [pokemonSpdStat, setpokemonSpdStat] = useState("")
  const [pokemonURL, setPokemonURl] = useState("")

  // Get Pokemon data from API =====================

  useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon/rayquaza')
      .then((res) => {
        // console.log(res.data)

        setPokemonSprite(res.data.sprites.other["official-artwork"].front_default)
        setPokemonName(res.data.species.name)
        setDexNumber(res.data.id)
        setPokemonHeight(res.data.height)
        setpokemonHpStat(res.data.stats[0].base_stat)
        setpokemonAtkStat(res.data.stats[1].base_stat)
        setpokemonDefStat(res.data.stats[2].base_stat)
        setpokemonSpAtkStat(res.data.stats[3].base_stat)
        setpokemonSpDefStat(res.data.stats[4].base_stat)
        setpokemonSpdStat(res.data.stats[5].base_stat)
        setPokemonURl(res.data.species.url)
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

  const radialData = {
    labels: ['HP', 'Attack', 'Defence', 'Speed', 'Sp. Def', 'Sp. Atk'],
    datasets: [
      {
        label: '# of Votes',
        data: [pokemonHpStat, pokemonAtkStat, pokemonDefStat, pokemonSpAtkStat, pokemonSpDefStat, pokemonSpdStat],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

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

      {/* Pokemon info ===================== */}
      <Row className="mb-25">
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

{       /* Radar Chart ===================== */}
        <Col xs={4}>
          <div className='rounded-container gb-dark-grey'>
            <Radar data={radialData} />
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          <div className='rounded-container gb-dark-grey'>
            <Radar data={radialData} />
          </div>
        </Col>

        <Col xs={8}>
        </Col>
      </Row>

    </Col>

  );
}

export default Landing;
