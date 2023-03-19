import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

function WeaknessTable() {

  const [norDamage, setNormalDamage] = useState("")
  const [firDamage, setFireDamage] = useState("")
  const [watDamage, setWaterDamage] = useState("")
  const [eleDamage, setElectricDamage] = useState("")
  const [graDamage, setGrasDamage] = useState("")
  const [iceDamage, setICeDamage] = useState("")
  const [figDamage, setFightingDamage] = useState("")
  const [poiDamage, setPoisonDamage] = useState("")
  const [groDamage, setGroundDamage] = useState("")
  const [flyDamage, setFlyingDamage] = useState("")
  const [psyDamage, setPsychicDamage] = useState("")
  const [bugDamage, setBugDamage] = useState("")
  const [rocDamage, setRockDamage] = useState("")
  const [ghoDamage, setGhostDamage] = useState("")
  const [draDamage, setDragonDamage] = useState("")
  const [darDamage, setDarkDamage] = useState("")
  const [steDamage, setSteelDamage] = useState("")
  const [faiDamage, setFairyDamage] = useState("")

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/type/16/')
    .then((res) => {
      // console.log(res.data)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [])

  return (
    <div className='rounded-container bg-dark-grey mb-12-reset'>
      <h3 className='bold mb-15 text-center'>Weakness Table</h3>
      <p className='mb-15 text-center'>The numbers displayed are the damage multiplier for the each type.</p>
      <Table bordered>
        <tbody>
          <tr>
            <td>{norDamage}</td>
            <td>{firDamage}</td>
            <td>{watDamage}</td>
            <td>{eleDamage}</td>
            <td>{graDamage}</td>
            <td>{iceDamage}</td>
            <td>{figDamage}</td>
            <td>{poiDamage}</td>
            <td>{groDamage}</td>
          </tr>
          
          <tr>
            <td style={{backgroundColor: '#A8A77A', color: 'black', width: '11%'}}>NOR</td>
            <td style={{backgroundColor: '#EE8130', color: 'black', width: '11%'}}>FIR</td>
            <td style={{backgroundColor: '#6390F0', color: 'black', width: '11%'}}>WAT</td>
            <td style={{backgroundColor: '#F7D02C', color: 'black', width: '11%'}}>ELE</td>
            <td style={{backgroundColor: '#7AC74C', color: 'black', width: '11%'}}>GRA</td>
            <td style={{backgroundColor: '#96D9D6', color: 'black', width: '11%'}}>ICE</td>
            <td style={{backgroundColor: '#C22E28', color: 'black', width: '11%'}}>FIG</td>
            <td style={{backgroundColor: '#A33EA1', color: 'black', width: '11%'}}>POI</td>
            <td style={{backgroundColor: '#E2BF65', color: 'black', width: '11%'}}>GRO</td>
          </tr>

          <tr>
            <td style={{backgroundColor: '#A98FF3', color: 'black', width: '11%'}}>FLY</td>
            <td style={{backgroundColor: '#F95587', color: 'black', width: '11%'}}>PSY</td>
            <td style={{backgroundColor: '#A6B91A', color: 'black', width: '11%'}}>BUG</td>
            <td style={{backgroundColor: '#B6A136', color: 'black', width: '11%'}}>ROC</td>
            <td style={{backgroundColor: '#735797', color: 'black', width: '11%'}}>GHO</td>
            <td style={{backgroundColor: '#6F35FC', color: 'black', width: '11%'}}>DRA</td>
            <td style={{backgroundColor: '#705746', color: 'black', width: '11%'}}>DAR</td>
            <td style={{backgroundColor: '#B7B7CE', color: 'black', width: '11%'}}>STE</td>
            <td style={{backgroundColor: '#D685AD', color: 'black', width: '11%'}}>FAI</td>
          </tr>

          <tr>
            <td>{flyDamage}</td>
            <td>{psyDamage}</td>
            <td>{bugDamage}</td>
            <td>{rocDamage}</td>
            <td>{ghoDamage}</td>
            <td>{draDamage}</td>
            <td>{darDamage}</td>
            <td>{steDamage}</td>
            <td>{faiDamage}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default WeaknessTable;