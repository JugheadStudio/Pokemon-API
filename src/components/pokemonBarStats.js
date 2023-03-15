import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, LineElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement
);

const PokemonBarChart = () => {

	const [PokemonData, setPokemonData] = useState();

	useEffect(() => {
			axios.get("https://pokeapi.co/api/v2/pokemon/rayquaza")
			.then((res) => {
					setPokemonData(res.data)        
			})
	}, [])
		
		const hp = PokemonData?.stats[0].base_stat;
		const Attack = PokemonData?.stats[1].base_stat;
		const Defense = PokemonData?.stats[2].base_stat;
		const SpecialAttack = PokemonData?.stats[3].base_stat;
		const SpecialDeffence = PokemonData?.stats[4].base_stat;
		const Speed = PokemonData?.stats[5].base_stat;

		const labels = ['HP' , 'Atk', 'Def', 'Sp.Atk', 'Sp.Def', 'Spd'];
	
		const data = {
			labels,
			datasets: [
				{
					data: [hp, Attack, Defense, SpecialAttack, SpecialDeffence, Speed],
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

		const config = {
			type: 'bar',
			options: {
				indexAxis: 'y',
				scales: {
					y: {
						beginAtZero: true
					}
				},
				elements: {
					bar: {
						borderWidth: 0,
						borderRadius: 25
					}
				}
			},
		};

	return (

		<div className='rounded-container bg-dark-grey'>
			<h3 className='bold mb-15 text-center'>Pokemon Stats</h3>
			<Bar data={data} options= {{
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
				}
			}} />
		</div>

	);
};

export default PokemonBarChart;