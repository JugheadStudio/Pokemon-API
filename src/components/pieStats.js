import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Chart JS =====================
import { Chart as ChartJS, ArcElement,} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

const PieStats = (props) => {

  // Get the pokemon data from props
  const pokemonData = props.pokemonData;

  // Get the css color variables from the body which is declared in the Colors.css file
  const cssColorVar = getComputedStyle(document.body);

  // Random pokemon variables
  const [randomPokemonStats1, setrandomPokemonStats1] = useState('');
  const [randomPokemonName1, setrandomPokemonName1] = useState('');

  const [randomPokemonStats2, setrandomPokemonStats2] = useState('');
  const [randomPokemonName2, setrandomPokemonName2] = useState('');

  const [randomPokemonStats3, setrandomPokemonStats3] = useState('');
  const [randomPokemonName3, setrandomPokemonName3] = useState('');

  // Random generated Pokemon 1 using the math.random function to generate a random number between 1 and 1008
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1008))
    .then((res) => {

      // Declare the variable where the data will be stored
      let RandomPokemonStatsTotal1 = 0;

      // Loop through the data from the axios call and add the base stats together
      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal1 += res.data.stats[i].base_stat;
      }

      // Set the state of the variable using the data from the declared variable
      setrandomPokemonName1(res.data.name)
      setrandomPokemonStats1(RandomPokemonStatsTotal1)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData])

  // Random generated Pokemon 2 using the math.random function to generate a random number between 1 and 1008
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1008))
    .then((res) => {

      // Declare the variable where the data will be stored
      let RandomPokemonStatsTotal2 = 0;

      // Loop through the data from the axios call and add the base stats together
      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal2 += res.data.stats[i].base_stat;
      }

      // Set the state of the variable using the data from the declared variable
      setrandomPokemonName2(res.data.name)
      setrandomPokemonStats2(RandomPokemonStatsTotal2)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData])

  // Random generated Pokemon 3 using the math.random function to generate a random number between 1 and 1008
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1008))
    .then((res) => {

      // Declare the variable where the data will be stored
      let RandomPokemonStatsTotal3 = 0;

      // Loop through the data from the axios call and add the base stats together
      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal3 += res.data.stats[i].base_stat;
      }

      // Set the state of the variable using the data from the declared variable
      setrandomPokemonName3(res.data.name)
      setrandomPokemonStats3(RandomPokemonStatsTotal3)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData])

  // Chart data for the pie chart using the pokemon data from the props and the color variables from the css
  const pieData = {
    datasets: [
      {
        data: [pokemonData.baseStats.total, randomPokemonStats1, randomPokemonStats2, randomPokemonStats3],
        backgroundColor: [
          cssColorVar.getPropertyValue('--chart1'),
          cssColorVar.getPropertyValue('--chart2'),
          cssColorVar.getPropertyValue('--chart3'),
          cssColorVar.getPropertyValue('--chart4')
        ],
        borderColor: cssColorVar.getPropertyValue('--dark-grey'),
      },
    ],
  };
  

  return (

    // The code that will be pushed to the DOM using the data from the props and the state
    <div className='rounded-container bg-dark-grey'>
      <h3 className='bold mb-15 text-center'>Pokémon 1 Stats Comparison</h3>
      <p id='pieChartName' className='text-center mb-25'>Below you will find the total base stats of <span className='capitalize'>{pokemonData.name}</span> compared to <span className='capitalize'>{randomPokemonName1}</span>, <span className='capitalize'>{randomPokemonName2}</span> and <span className='capitalize'>{randomPokemonName3}</span> which were randomly selected.</p>
      <Row className="align-items-center">
        <Col xs={12} md={8} lg={8} className="mb-25">
          <div className='w-100'>
            <div className='responsive-width sm-m-auto'>
              <Doughnut data={pieData} className='m-auto'/>
            </div>
          </div>
        </Col>

        <Col xs={12} md={4} lg={4} className='xs-text-center'>
          <p className="mb-10 capitalize item-legend">{pokemonData.name}</p>
          <p className="mb-10 capitalize item-legend">{randomPokemonName1}</p>
          <p className="mb-10 capitalize item-legend">{randomPokemonName2}</p>
          <p className="mb-10 capitalize item-legend">{randomPokemonName3}</p>
        </Col>
      </Row>
    </div>

  )
}
  
export default PieStats;