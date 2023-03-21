import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

const WeaknessTable = ({ typeUrlOneToChild, typeUrlTwoToChild }) => {
  const [damageRelations, setDamageRelations] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeOneResponse, typeTwoResponse] = await Promise.all([
          axios.get('https://pokeapi.co/api/v2/type/16/'),
          axios.get('https://pokeapi.co/api/v2/type/3/'),
        ]);

        // console.log('Type one response:', typeOneResponse.data);
        // console.log('Type two response:', typeTwoResponse.data);

        setDamageRelations({
          ...typeOneResponse.data.damage_relations,
          ...typeTwoResponse.data.damage_relations,
        });

        // console.log(typeOneResponse.data.damage_relations);
        // console.log(typeTwoResponse.data.damage_relations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [typeUrlOneToChild, typeUrlTwoToChild]);

  const allTypes = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ];

  function calculateDamageMultiplier() {
    if (!damageRelations) return []; // Add a check for null damageRelations
    const multipliers = allTypes.map((type) => {
      const damageRelationsType = damageRelations[type];
      // console.log(type, damageRelationsType);
      let damageMultiplier = '';
      if (damageRelationsType) {
        if (damageRelationsType.double_damage_from.length > 0) {
          damageMultiplier = '2';
        } else if (damageRelationsType.half_damage_from.length > 0) {
          damageMultiplier = '0.5';
        } else if (damageRelationsType.no_damage_from.length > 0) {
          damageMultiplier = '0';
        } else {
          damageMultiplier = '1';
        }
      }
      return damageMultiplier;
    });
    return multipliers;
  }
  

  let damageMultiplier = calculateDamageMultiplier();

  return (
    <div className='rounded-container bg-dark-grey mb-12-reset'>
      <h3 className='bold mb-15 text-center'>Weakness Table</h3>
      <p className='mb-15 text-center'>
        The numbers displayed are the damage multiplier for each type.
      </p>
      <Table bordered>
        <tbody>
          <tr>
            {damageMultiplier.slice(0, 9).map((multiplier, index) => (
              <td key={index}>{multiplier}</td>
            ))}
          </tr>

          <tr>
            {damageMultiplier.slice(9).map((multiplier, index) => (
              <td key={index}>{multiplier}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default WeaknessTable;
