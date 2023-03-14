import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

import Table from 'react-bootstrap/Table';

function WeaknessTable() {

  const [apiData, setApiData] =useState([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/rayquaza')
    .then((res) => {
      // console.log(res.data)

    })
    .catch((err) => {
        console.log(err);
    })
  }, [])

  return (
    <div className='rounded-container gb-dark-grey'>
      <Table bordered>
        <tbody>
          <tr>
            <td>0</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>NOR</td>
            <td>FIR</td>
            <td>WAT</td>
            <td>ELE</td>
            <td>GRA</td>
            <td>ICE</td>
            <td>FIG</td>
            <td>POI</td>
            <td>GRO</td>
          </tr>

          <tr>
            <td>FLY</td>
            <td>PSY</td>
            <td>BUG</td>
            <td>ROC</td>
            <td>GHO</td>
            <td>DRA</td>
            <td>DAR</td>
            <td>STE</td>
            <td>FAI</td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default WeaknessTable;