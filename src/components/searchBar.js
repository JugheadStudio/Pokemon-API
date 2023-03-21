import React from 'react';
import { useState, useEffect } from "react";
import axios, { all } from "axios";

// Bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

let allPokemon = [];
let filteredPokemonAfterUserInput = [];

const SearchBar = (props) => {

  const [userSearchInput, setUserSearchInput] = useState('')

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

    // get input from user in the searchbar
    function getUserInput() {
      setUserSearchInput(document.getElementById("userSearchInput"))
      filterThroughResults(userSearchInput.value)
      return
    }

    // filter through allPokemon array and compare what the user has typed to see 
    // which pokemon names have those letter and push it to filteredPokemonAfterUserInput
    function filterThroughResults(...letters){
      filteredPokemonAfterUserInput = allPokemon.filter(w => letters.every(l => w.includes(l)));
      updateSearchResults()
      return
    }

    function updatePokemonChosenFromSearch(el) {
      props.func(el.target.innerHTML)
      console.log(filteredPokemonAfterUserInput);
      filteredPokemonAfterUserInput = ''
    }

    function updateSearchResults() {
      let searchResultsContainer = document.getElementById('seachBarTable');
      let newTableRowItem;

      searchResultsContainer.innerHTML = '';

      for (let i = 0; i < 5; i++) {
        if (typeof filteredPokemonAfterUserInput[i] === "undefined") {
          continue; // skip this iteration
        }
        newTableRowItem = searchResultsContainer.insertRow(i);
        newTableRowItem.innerHTML = '<td value="' + filteredPokemonAfterUserInput[i] + '">' + filteredPokemonAfterUserInput[i] + '</td>';

        newTableRowItem.addEventListener('click', function (e) {
          updatePokemonChosenFromSearch(e)
        });
      }
    }

  return (

      <Row className=''>
        <Col xs={12} md={6} xl={12}>
          <div className="input-box">
            <input id='userSearchInput' type="text" className="search-bar" placeholder="Type Pokemon name" onChange={() => getUserInput()}/>        
          </div>
        </Col>

        <table id='seachBarTable'>
        </table>
      </Row>

  );
}

export default SearchBar;
