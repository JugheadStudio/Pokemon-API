import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

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

const RadarStats = (props) => {

  const newURL = props.parentToChild;

    // PokeAPI variables =====================

  const [pokemonHpStat, setpokemonHpStat] = useState("")
  const [pokemonAtkStat, setpokemonAtkStat] = useState("")
  const [pokemonDefStat, setpokemonDefStat] = useState("")
  const [pokemonSpAtkStat, setpokemonSpAtkStat] = useState("")
  const [pokemonSpDefStat, setpokemonSpDefStat] = useState("")
  const [pokemonSpdStat, setpokemonSpdStat] = useState("")

  // Get Pokemon data from API =====================

  useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon/' + newURL)
      .then((res) => {
        // console.log(res.data)

        setpokemonHpStat(res.data.stats[0].base_stat)
        setpokemonAtkStat(res.data.stats[1].base_stat)
        setpokemonDefStat(res.data.stats[2].base_stat)
        setpokemonSpAtkStat(res.data.stats[3].base_stat)
        setpokemonSpDefStat(res.data.stats[4].base_stat)
        setpokemonSpdStat(res.data.stats[5].base_stat)
      })
      .catch((err) => {
          console.log(err);
      })
    }, [newURL])

    const radialData = {
      labels: ['HP', 'Attack', 'Defence', 'Speed', 'Sp. Def', 'Sp. Atk'],
      datasets: [
        {
          data: [pokemonHpStat, pokemonAtkStat, pokemonDefStat, pokemonSpdStat, pokemonSpDefStat, pokemonSpAtkStat],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(255, 99, 132, 0)',
        },
      ],
    };
  
    return (
      <Radar 
      options={{
        elements: {
          point: {
            radius: 0,
          }
        },
        scales: {
          r: {
            min: 0,
            angleLines: {
              color: 'transparent'
            },
            grid: {
              color: '#1f2025'
            },
            pointLabels: {
              color: '#d4d8e3'
            },
            ticks: {
              display: false
            }
          }
        }
      }} data={radialData} className='m-auto'/>
    )
  }
  
  export default RadarStats;