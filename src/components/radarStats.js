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

function RadarStats() {

    // PokeAPI variables =====================

  const [apiData, setApiData] =useState([]);
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

    const config = {
      type: 'radar',
      data: {},
      options: {
        
      },
      plugins: []
    }
  
    return (
      <div className='rounded-container bg-mid-grey'>
        <h3 className='bold mb-15 text-center'>Stats Chart</h3>
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
        }} data={radialData} />
      </div>
    )
  }
  
  export default RadarStats;