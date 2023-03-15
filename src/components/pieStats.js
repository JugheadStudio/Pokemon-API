import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

// Chart JS =====================
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PieStats() {

  // PokeAPI variables =====================
  // Pokemon user searched for
  const [userPokemonStats, setuserPokemonStats] = useState("")
  const [userPokemonName, setuserPokemonName] = useState("")

  // Random pokemon
  const [randomPokemonStats1, setrandomPokemonStats1] = useState("")
  const [randomPokemonName1, setrandomPokemonName1] = useState("")

  const [randomPokemonStats2, setrandomPokemonStats2] = useState("")
  const [randomPokemonName2, setrandomPokemonName2] = useState("")

  const [randomPokemonStats3, setrandomPokemonStats3] = useState("")
  const [randomPokemonName3, setrandomPokemonName3] = useState("")


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
    labels: [
      userPokemonName.charAt(0).toUpperCase() + userPokemonName.slice(1),
      randomPokemonName1.charAt(0).toUpperCase() + randomPokemonName1.slice(1),
      randomPokemonName2.charAt(0).toUpperCase() + randomPokemonName2.slice(1),
      randomPokemonName3.charAt(0).toUpperCase() + randomPokemonName3.slice(1)
    ],
    datasets: [
      {
        data: [userPokemonStats, randomPokemonStats1, randomPokemonStats2, randomPokemonStats3],
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 255, 255, 0.75)',
          'rgba(255, 255, 255, 0.5)',
          'rgba(255, 255, 255, 0.25)'
        ],
        borderColor: 'rgba(255, 99, 132, 0)',
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
    <Doughnut options={config} data={pieData} />
  )
}
  
export default PieStats;