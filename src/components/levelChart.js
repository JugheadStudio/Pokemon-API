import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

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

  // Get the pokemon data from props
  const pokemonData = props.pokemonData

  // Get the css color variables from the body which is declared in the Colors.css file
  const cssColorVar = getComputedStyle(document.body);

  // PokeAPI variables
  const [pokemonLevelStats, setPokemonLevelStats] = useState("")
  const [pokemonExperienceNeeded, setPokemonExperienceNeeded] = useState("")

  // Get Pokemon data from API using an axios call
  useEffect(() => {
    axios.get(pokemonData.growthRateUrl)
    .then((res) => {

      // Declare the arrays where the data will be stored
      const pokemonLevel = [];
      const experiencePoints = [];

      // Loop through the data from the axios call and push the level and experience data into the arrays
      for ( var i = 0; i < 100; i += 9 ) {
        pokemonLevel.push(res.data.levels[i].level.toString());
        experiencePoints.push(res.data.levels[i].experience);
      }

      // Set the state of the arrays using the data from the declared arrays
      setPokemonLevelStats(pokemonLevel)
      setPokemonExperienceNeeded(experiencePoints)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [pokemonData.growthRateUrl]);

  // Set the data for the chart
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

    // Render the chart with the data from the props
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