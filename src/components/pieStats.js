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

function PieStats() {

  const cssColorVar = getComputedStyle(document.body);

  // PokeAPI variables =====================
  // Pokemon user searched for
  const [userPokemonStats, setuserPokemonStats] = useState("");
  const [userPokemonName, setuserPokemonName] = useState("");

  // Random pokemon
  const [randomPokemonStats1, setrandomPokemonStats1] = useState("");
  const [randomPokemonName1, setrandomPokemonName1] = useState("");

  const [randomPokemonStats2, setrandomPokemonStats2] = useState("");
  const [randomPokemonName2, setrandomPokemonName2] = useState("");

  const [randomPokemonStats3, setrandomPokemonStats3] = useState("");
  const [randomPokemonName3, setrandomPokemonName3] = useState("");

  // Get Pokemon data from API =====================

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/rayquaza')
    .then((res) => {

      let userPokemonStatsTotal = 0;

      for ( var i = 0; i < res.data.stats.length; i++ ) {
        userPokemonStatsTotal += res.data.stats[i].base_stat;
      }

      setuserPokemonName(res.data.name)
      setuserPokemonStats(userPokemonStatsTotal)

      console.log(userPokemonStatsTotal)
    })
    .catch((err) => {
        console.log(err);
    })
  }, [])

  // Random generated Pokemon 1
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1010))
    .then((res) => {

      let RandomPokemonStatsTotal1 = 0;

      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal1 += res.data.stats[i].base_stat;
      }

      setrandomPokemonName1(res.data.name)
      setrandomPokemonStats1(RandomPokemonStatsTotal1)

      console.log(RandomPokemonStatsTotal1)
    })
    .catch((err) => {
        console.log(err);
    })
  }, [])

  // Random generated Pokemon 2
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1010))
    .then((res) => {

      let RandomPokemonStatsTotal2 = 0;

      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal2 += res.data.stats[i].base_stat;
      }

      setrandomPokemonName2(res.data.name)
      setrandomPokemonStats2(RandomPokemonStatsTotal2)

      console.log(RandomPokemonStatsTotal2)
    })
    .catch((err) => {
        console.log(err);
    })
  }, [])

  // Random generated Pokemon 2
  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + Math.floor(Math.random() * 1010))
    .then((res) => {

      let RandomPokemonStatsTotal3 = 0;

      for ( var i = 0; i < res.data.stats.length; i++ ) {
        RandomPokemonStatsTotal3 += res.data.stats[i].base_stat;
      }

      setrandomPokemonName3(res.data.name)
      setrandomPokemonStats3(RandomPokemonStatsTotal3)

      console.log(RandomPokemonStatsTotal3)
    })
    .catch((err) => {
        console.log(err);
    })
  }, [])

  const pieData = {
    datasets: [
      {
        data: [userPokemonStats, randomPokemonStats1, randomPokemonStats2, randomPokemonStats3],
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

  const config = {
    type: 'doughnut',
    data: {},
    options: {
      
    },
    plugins: []
  }

  return (

    <div className='rounded-container bg-dark-grey'>
      <h3 className='bold mb-15 text-center'>Stats Comparison</h3>
      <p id='pieChartName' className='text-center'>Below you will find the base stats of <span className='capitalize'>{userPokemonName}</span> compared to <span className='capitalize'>{randomPokemonName1}</span>, <span className='capitalize'>{randomPokemonName2}</span> and <span className='capitalize'>{randomPokemonName3}</span> which were randomly selected.</p>
      <div className='rounded-container'>
      <Row className="align-items-center">
        <Col xs={8}>
          <div className='w-100'>
            <div className='w-75'>
              <Doughnut options={config} data={pieData} />
            </div>
          </div>
        </Col>

        <Col xs={4}>
          <p className="mb-10 capitalize item-legend">{userPokemonName}</p>
          <p className="mb-10 capitalize item-legend">{randomPokemonName1}</p>
          <p className="mb-10 capitalize item-legend">{randomPokemonName2}</p>
          <p className="mb-10 capitalize item-legend">{randomPokemonName3}</p>
        </Col>
      </Row>
    </div>
    </div>

  )
}
  
export default PieStats;