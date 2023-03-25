import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const WeaknessTable = (props) => {
  
  const pokemonData = props.pokemonData;

  const [damageMultiplier, setDamageMultiplier] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const urls = pokemonData.types.map((type) => type.typeUrl);
      const responses = await Promise.all(urls.map((url) => axios.get(url)));
      const damageRelations = responses.map((response) => response.data.damage_relations);
      calculateDamageMultiplier(damageRelations);
    };
    fetchData();
  }, [pokemonData]);

  const calculateDamageMultiplier = (damageRelations) => {
    const damageMultipliers = [
      { name: "normal", multiplier: 1 },
      { name: "fighting", multiplier: 1 },
      { name: "flying", multiplier: 1 },
      { name: "poison", multiplier: 1 },
      { name: "ground", multiplier: 1 },
      { name: "rock", multiplier: 1 },
      { name: "bug", multiplier: 1 },
      { name: "ghost", multiplier: 1 },
      { name: "steel", multiplier: 1 },
      { name: "fire", multiplier: 1 },
      { name: "water", multiplier: 1 },
      { name: "grass", multiplier: 1 },
      { name: "electric", multiplier: 1 },
      { name: "psychic", multiplier: 1 },
      { name: "ice", multiplier: 1 },
      { name: "dragon", multiplier: 1 },
      { name: "dark", multiplier: 1 },
      { name: "fairy", multiplier: 1 },
    ];
  
    for (let i = 0; i < damageRelations.length; i++) {
      const typeDamageRelations = damageRelations[i];
      typeDamageRelations.double_damage_from.forEach((type) => {
        const index = damageMultipliers.findIndex((obj) => obj.name === type.name);
        if (index !== -1) {
          damageMultipliers[index].multiplier *= 2;
        }
      });
      typeDamageRelations.half_damage_from.forEach((type) => {
        const index = damageMultipliers.findIndex((obj) => obj.name === type.name);
        if (index !== -1) {
          damageMultipliers[index].multiplier *= 0.5;
        }
      });
      typeDamageRelations.no_damage_from.forEach((type) => {
        const index = damageMultipliers.findIndex((obj) => obj.name === type.name);
        if (index !== -1) {
          damageMultipliers[index].multiplier *= 0;
        }
      });
    }
    setDamageMultiplier(damageMultipliers.map(obj => obj.multiplier));
  };

  return (
    <div className='rounded-container bg-dark-grey mb-25'>
      <h3 className='bold mb-15 text-center'>Weakness Table</h3>
      <p className='mb-15 text-center'>
        The numbers displayed are the damage taken multiplier for each type.
      </p>
      <Table bordered style={{ width: "100%" }}>
        <tbody>
          <tr>
            {damageMultiplier.slice(0, 9).map((multiplier, index) => (
              <td className='weakness-item' key={index + 'type1'}>{multiplier}</td>
            ))}
          </tr>

          <tr>
            <td className='weakness-item dark-text normal'>NOR</td>
            <td className='weakness-item dark-text fighting'>FIG</td>
            <td className='weakness-item dark-text flying'>FLY</td>
            <td className='weakness-item dark-text poison'>POI</td>
            <td className='weakness-item dark-text ground'>GRO</td>
            <td className='weakness-item dark-text rock'>ROC</td>
            <td className='weakness-item dark-text bug'>BUG</td>
            <td className='weakness-item dark-text ghost'>GHO</td>
            <td className='weakness-item dark-text steel'>STE</td>
          </tr>

          <tr>
            <td className='weakness-item dark-text fire'>FIR</td>
            <td className='weakness-item dark-text water'>WAT</td>
            <td className='weakness-item dark-text grass'>GRA</td>
            <td className='weakness-item dark-text electric'>ELE</td>
            <td className='weakness-item dark-text psychic'>PSY</td>
            <td className='weakness-item dark-text ice'>ICE</td>
            <td className='weakness-item dark-text dragon'>DRA</td>
            <td className='weakness-item dark-text dark'>DAR</td>
            <td className='weakness-item dark-text fairy'>FAI</td>
          </tr>

          <tr>
            {damageMultiplier.slice(9).map((multiplier, index) => (
              <td className='weakness-item' key={index + 'type2'}>{multiplier}</td>
            ))}
          </tr>

        </tbody>
      </Table>
    </div>
  );
};

export default WeaknessTable;
