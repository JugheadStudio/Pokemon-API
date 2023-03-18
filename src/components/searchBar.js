import React from 'react';
import { useState, useEffect } from "react";
import axios, { all } from "axios";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let allPokemon = [];
let searchedPokemon = [];
let userSearchInput = '';


function SearchBar() {

  useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281')
      .then((res) => {

        for ( var i = 0; i < res.data.results.length; i++ ) {
          allPokemon.push(res.data.results[i].name.toString());
        }

      })
      .catch((err) => {
          console.log(err);
      })
    }, []);

    function getUserInput() {
      userSearchInput = document.getElementById("userSearchInput");

      find(userSearchInput.value)
      // console.log(searchedPokemon);
      return
    }

    function find(...letters){
      searchedPokemon = allPokemon.filter(w => letters.every(l => w.includes(l)));
      updateText()
      return
    }

    function updateText(index) {
      let tablePos = document.getElementById('table');
      let pokemon = searchedPokemon.toString();
      let displayPokemon = []
      // let tableRow = tablePos.insertRow(index+1)
      // let cell1 = tableRow.insertCell(0)

      // cell1.innerHTML = searchedPokemon;
      // console.log(pokemon);
      tablePos.innerHTML = '';

      displayPokemon.push(searchedPokemon)

      for ( var i = 0; i < displayPokemon[0].length; i++ ) {

        let tableRow = tablePos.insertRow(i);

        if (displayPokemon[0].length > 0) {
          tableRow.innerHTML = '<td>' + searchedPokemon[i] + '</td>';
          
        } else {
          tableRow.innerHTML = '<td>No Pokemon with that name</td>'
        }
      }
    }


  return (

      <Row className=''>
        <Col xs={12} md={6} xl={12}>
          <div className="input-box">
            <input id='userSearchInput' type="text" className="search-bar" placeholder="Type Pokemon name" onChange={() => getUserInput()}/>           
          </div>
        </Col>

        <table id='table'>
        </table>
      </Row>

  );
}

export default SearchBar;
