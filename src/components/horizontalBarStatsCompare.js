import React from 'react';

import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement
);

const HorizontalBarStats = (props) => {

  // Get the pokemon data from props
	const pokemonData = props.pokemonData;


  const labels = [ 'HP', 'Attack', 'Defence', 'Speed', 'Sp. Def', 'Sp. Atk' ]
	
		const data = {
			labels,
			datasets: [
				{
					data: [pokemonData.baseStats.hp, 
            pokemonData.baseStats.attack, 
            pokemonData.baseStats.defense, 
            pokemonData.baseStats.speed, 
            pokemonData.baseStats.spDefense, 
            pokemonData.baseStats.spAttack],
					backgroundColor: [
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
					],
					borderColor: [
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(54, 162, 235, 1)',
					],
					borderWidth: 0,
					barPercentage: 0.5
				},
			],
		};

	return (

    // Render the chart with the data from the props
		<Bar
      data={data}
      options={{
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#d4d8e3',
            },
            grid: {
              color: 'transparent'
            }
          },
          x: {
            ticks: {
              color: '#d4d8e3',
            },
            grid: {
              color: 'transparent'
            }
          }
        },
        elements: {
          bar: {
            borderRadius: 25,
            borderSkipped: false
          }
        },
        plugins: {
          datalabels: {
            align: 'end',
            anchor: 'end',
            color: '#fff',
            font: {
              size: 14,
              weight: 'bold'
            },
            formatter: function(value, context) {
              return `${value} `;
            }
          }
        }
      }}
    />
	);
};

export default HorizontalBarStats;