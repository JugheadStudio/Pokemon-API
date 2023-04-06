import React from 'react';

// Chart JS =====================
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip
  } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

const RadarStats = (props) => {

  // get the pokemon data from props
  const pokemonData = props.pokemonData;

  // Push pokemon base stats data into chart
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
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
      },
    ],
    options: {
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return data.labels[tooltipItem.index] + ': ' + data.datasets[0].data[tooltipItem.index];
          },
          afterLabel: function (tooltipItem, data) {
            return pokemonData.baseStats[data.labels[tooltipItem.index]];
          }
        },
      },
    },
  };
  
  return (
    <Radar 
    options={{
      elements: {
        point: {
          radius: 2,
        }
      },
      scales: {
        r: {
          min: 0,
          max: 211,
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
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