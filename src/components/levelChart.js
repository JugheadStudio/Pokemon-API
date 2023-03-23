import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Chart JS =====================
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement  
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement 
);

const LevelChart = (props) => {

  const pokemonData = props.pokemonData

  const cssColorVar = getComputedStyle(document.body);

  // PokeAPI variables =====================
  const [pokemonLevelStats, setPokemonLevelStats] = useState("")
  const [pokemonExperienceNeeded, setPokemonExperienceNeeded] = useState("")

  // Get Pokemon data from API =====================

  useEffect(() => {
    axios.get(pokemonData.growthRateUrl)
    .then((res) => {

      const pokemonLevel = [];
      const experiencePoints = [];

      for ( var i = 0; i < 100; i += 9 ) {
        pokemonLevel.push(res.data.levels[i].level.toString());
        experiencePoints.push(res.data.levels[i].experience);
      }

      setPokemonLevelStats(pokemonLevel)
      setPokemonExperienceNeeded(experiencePoints)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData.growthRateUrl]);

  const levelData = {
    labels: pokemonLevelStats,
    datasets: [{
        data: pokemonExperienceNeeded,
        backgroundColor: cssColorVar.getPropertyValue('--chart1'),
        borderColor: cssColorVar.getPropertyValue('--primary'),
        pointBorderColor: 'transparent',
    }]
  };


  return (

    <div className='line-chart-wrapper'>
    <Line data={levelData} options={{
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: {
            color: cssColorVar.getPropertyValue('--mid-grey')
          },
          ticks: {
            color: '#d4d8e3',
          },
        },
        x: {
          grid: {
            color: cssColorVar.getPropertyValue('--mid-grey')
          },
          ticks: {
            color: '#d4d8e3',
          },
        }
      }
    }}/>
    </div>

  )
}
  
export default LevelChart;