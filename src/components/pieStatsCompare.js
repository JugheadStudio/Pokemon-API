import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Chart JS =====================
import { Chart as ChartJS, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);

const PieStats = (props) => {

  const pokemonData = props.pokemonData;

  const cssColorVar = getComputedStyle(document.body);

  // Random pokemon
  const [randomPokemonStats1, setrandomPokemonStats1] = useState("");
  const [randomPokemonName1, setrandomPokemonName1] = useState("");

  const [randomPokemonStats2, setrandomPokemonStats2] = useState("");
  const [randomPokemonName2, setrandomPokemonName2] = useState("");

  const [randomPokemonStats3, setrandomPokemonStats3] = useState("");
  const [randomPokemonName3, setrandomPokemonName3] = useState("");

  // Random generated Pokemon 1
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1000))
    .then((res) => {

      let RandomPokemonStatsTotal1 = 0;

      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal1 += res.data.stats[i].base_stat;
      }

      setrandomPokemonName1(res.data.name)
      setrandomPokemonStats1(RandomPokemonStatsTotal1)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData])

  // Random generated Pokemon 2
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1000))
    .then((res) => {

      let RandomPokemonStatsTotal2 = 0;

      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal2 += res.data.stats[i].base_stat;
      }

      setrandomPokemonName2(res.data.name)
      setrandomPokemonStats2(RandomPokemonStatsTotal2)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData])

  // Random generated Pokemon 2
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1000))
    .then((res) => {

      let RandomPokemonStatsTotal3 = 0;

      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal3 += res.data.stats[i].base_stat;
      }

      setrandomPokemonName3(res.data.name)
      setrandomPokemonStats3(RandomPokemonStatsTotal3)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData])

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

    <div className='rounded-container bg-dark-grey'>
      <h3 className='bold mb-15 text-center'>Stats Comparison</h3>
      <p id='pieChartName' className='text-center mb-25'>Below you will find the base stats of <span className='capitalize'>{pokemonData.name}</span> compared to <span className='capitalize'>{randomPokemonName1}</span>, <span className='capitalize'>{randomPokemonName2}</span> and <span className='capitalize'>{randomPokemonName3}</span> which were randomly selected.</p>
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