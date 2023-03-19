import React from 'react';
import { useState, useEffect } from "react";
import axios, { all } from "axios";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let allPokemon = [];
let searchedPokemonResults = [];
let userSearchInput = '';
export let pokemonChosenFromSearch = 'rayquaza';

function SearchBar() {

  useEffect(() => {
    // https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281
      axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1008')
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

      filterThroughResults(userSearchInput.value)
      return
    }

    function filterThroughResults(...letters){
      searchedPokemonResults = allPokemon.filter(w => letters.every(l => w.includes(l)));
      updateSearchResults()
      return
    }

    function updatePokemonChosenFromSearch(el) {
      pokemonChosenFromSearch = el.target.innerHTML
      console.log(pokemonChosenFromSearch + " this is the new link");
    }

    function updateSearchResults() {
      let searchResultsContainer = document.getElementById('table');
      let displayPokemonResults = []

      searchResultsContainer.innerHTML = '';

      displayPokemonResults.push(searchedPokemonResults)

      for ( var i = 0; i < displayPokemonResults[0].length; i++ ) {

        let newTableRowItem = searchResultsContainer.insertRow(i);

        if (displayPokemonResults[0].length > 0) {
          newTableRowItem.innerHTML = '<td value="' + searchedPokemonResults[i] + '">' + searchedPokemonResults[i] + '</td>';
          newTableRowItem.addEventListener('click', function (e) {
            updatePokemonChosenFromSearch(e)
            console.log(displayPokemonResults);
          });
        } else {
          newTableRowItem.innerHTML = '<td>No Pokemon with that name</td>'
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
