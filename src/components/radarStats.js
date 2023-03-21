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

  const pokemonData = props.pokemonData;
  // console.log(pokemonData.baseStats);

    const radialData = {
      labels: ['HP', 'Attack', 'Defence', 'Speed', 'Sp. Def', 'Sp. Atk'],
      datasets: [
        {
          data: [pokemonData.baseStats.hp, 
            pokemonData.baseStats.attack, 
            pokemonData.baseStats.defense, 
            pokemonData.baseStats.speed, 
            pokemonData.baseStats.spDefense, 
            pokemonData.baseStats.spAttack],
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