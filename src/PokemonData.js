import axios from 'axios';

// Get the pokemon data from the pokeapi
export const getPokemonData = async (pokemonName) => {
  try {
    // Get the pokemon data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = response.data;

    // Get all the data we need from the pokemon data and store it in a new object that can be imported into all the pages that need it
    const data = {
      name: pokemon.species.name,
      fullName: pokemon.name,
      ability: pokemon.abilities.map(ability => ability.ability.name),
      sprites: pokemon.sprites,
      officialArtwork: pokemon.sprites.other['official-artwork'].front_default,
      officialShiny: pokemon.sprites.other['official-artwork'].front_shiny,
      types: pokemon.types.map(type => ({
        type: type.type.name,
        typeUrl: type.type.url,
      })),
      dexNumber: pokemon.id,
      height: pokemon.height / 10,
      weight: pokemon.weight / 10,
      moves: pokemon.moves.map(move => move.move),
      heldItems: pokemon.held_items.map(item => item.item),
      speciesURl: pokemon.species.url,
      baseStats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        spAttack: pokemon.stats[3].base_stat,
        spDefense: pokemon.stats[4].base_stat,
        total: pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)
      }
    };

    // Get the evolution chain data
    const growthRateResponse = await axios.get(pokemon.species.url);
    data.growthRate = growthRateResponse.data.growth_rate.name;

    // Get the growth rate data
    const growthRateUrlResponse = await axios.get(pokemon.species.url);
    data.growthRateUrl = growthRateUrlResponse.data.growth_rate.url;

    // Get the species data
    const genusResponse = await axios.get(pokemon.species.url);
    data.species = genusResponse.data.genera[7] ? genusResponse.data.genera[7].genus : 'no species defined';

    const speciesResponse = await axios.get(pokemon.species.url);

    // Data for evolution chain ========================
    // current pokemon Data
    data.evolutionData = {
      currentPokemon: {
        name: data.name,
        id: data.dexNumber,
        speciesURl: data.speciesURl,
        fullName: data.fullName,
      }
    };

    // get evolvesTo data from current pokemon
    const evolutionChainResponse = await axios.get(speciesResponse.data.evolution_chain.url);
    data.evolutionData.evolutionChain = evolutionChainResponse.data.chain;  

    // get evolvesTo data from current pokemon
    const getFullNameAndSprite = async (id) => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const fullName = res.data.name
      const sprite = res.data.sprites.front_default;
      return { fullName, sprite };
    }

    async function getEvolutionData(evolutionChain) {
      const id = evolutionChain.species.url.split('/').slice(-2, -1)[0];
      const { fullName, sprite } = await getFullNameAndSprite(id);
      const speciesURL = evolutionChain.species.url;
    
      return {
        name: evolutionChain.species.name,
        id: id,
        fullName: fullName,
        spriteUrl: sprite,
        speciesURL: speciesURL,
      };
    }
    
    // get first evolution data
    const firstEvolutionChain = data.evolutionData.evolutionChain;
    data.evolutionData.firstEvolution = await getEvolutionData(firstEvolutionChain);
    
    // get second evolution data
    data.evolutionData.secondEvolution = [];

    for (let i = 0; i < firstEvolutionChain.evolves_to.length; i++) {
      const secondEvolutionChain = firstEvolutionChain.evolves_to[i];
      const secondEvolutionData = await getEvolutionData(secondEvolutionChain);
      data.evolutionData.secondEvolution.push(secondEvolutionData);
    }
    
    // get third evolution data
    data.evolutionData.thirdEvolution = [];
    for (let i = 0; i < data.evolutionData.secondEvolution.length; i++) {
      let secondEvo = data.evolutionData.secondEvolution[i];
      let evolvesTo = firstEvolutionChain.evolves_to.find((e) => e.species.name === secondEvo.name);

      // if there is a third evolution get the data
      if (evolvesTo && evolvesTo.evolves_to && evolvesTo.evolves_to.length > 0) {
        let thirdEvolvesTo = evolvesTo.evolves_to[0];
        const id = thirdEvolvesTo.species.url.split('/').slice(-2, -1)[0];
        const { fullName, sprite } = await getFullNameAndSprite(id);
        data.evolutionData.thirdEvolution.push({
          fullName: fullName,
          name: thirdEvolvesTo.species.name,
          id: id,
          spriteUrl: sprite,
          speciesURL: thirdEvolvesTo.species.url,
        });
      }
    }
    
    // get evolvesFrom data from current pokemon
    const firstEvolution = data.evolutionData.firstEvolution.name;
    let evolvesTo = data.evolutionData.evolvesTo;

    // get evolvesTo from current pokemon if there is a second evolution
    const secondEvolutionArray = [];
    for (let key in data.evolutionData.secondEvolution) {
      secondEvolutionArray.push(data.evolutionData.secondEvolution[key]);
    }

    // get evolvesTo from current pokemon if there is a third evolution
    const thirdEvolutionArray = [];
    for (let key in data.evolutionData.thirdEvolution) { 
      thirdEvolutionArray.push(data.evolutionData.thirdEvolution[key]);
    }

    // get evolvesFrom data from current pokemon
    const currentPokemonName = data.evolutionData.currentPokemon.name;
    let evolvesFrom = data.evolutionData.evolvesFrom;

    // if current pokemon is first evolution set evolvesFrom to None
    if (currentPokemonName === firstEvolution) {
      evolvesFrom = {name: 'None', spriteUrl: 'None', fullName: 'None'};
    } else { // if current pokemon is not first evolution set evolvesFrom to the first evolution
      let found = false;
      for (let i = 0; i < secondEvolutionArray.length; i++) {
        if (secondEvolutionArray[i].name.includes(currentPokemonName)) {
          evolvesFrom = {
            name: firstEvolution, 
            spriteUrl: data.evolutionData.firstEvolution.spriteUrl, 
            fullName: data.evolutionData.firstEvolution.fullName
          };
          found = true;
          break;
        }
      }
      // if current pokemon is not first evolution or second evolution set evolvesFrom to the second evolution
      if (!found) {
        for (let i = 0; i < thirdEvolutionArray.length; i++) {
          if (thirdEvolutionArray[i].name.includes(currentPokemonName)) {
            evolvesFrom = {
              name: secondEvolutionArray[i].name, 
              spriteUrl: secondEvolutionArray[i].spriteUrl, 
              fullName: data.evolutionData.secondEvolution[i].fullName
            };
            found = true;
            break;
          }
        }
      }
    }
    
    // get evolvesTo from current pokemon ========================
    // if current pokemon is first evolution set evolvesTo to the second evolution
    if (currentPokemonName === firstEvolution) {
      if (data.evolutionData.secondEvolution && data.evolutionData.secondEvolution[0]) {
        evolvesTo = {
          name: data.evolutionData.secondEvolution[0].name, 
          spriteUrl: data.evolutionData.secondEvolution[0].spriteUrl, 
          fullName: data.evolutionData.secondEvolution[0].fullName
        };
      } else { // if current pokemon is first evolution and there is no second evolution set evolvesTo to None
        evolvesTo = {name: 'None', spriteUrl: 'None', fullName: 'None'};
      }
    } else { // if current pokemon is not first evolution set evolvesTo to the third evolution
      let found = false;
      for (let i = 0; i < secondEvolutionArray.length; i++) {
        if (secondEvolutionArray[i].name.includes(currentPokemonName)) {
          if (data.evolutionData.thirdEvolution && data.evolutionData.thirdEvolution[i]) {
            evolvesTo = {
              name: data.evolutionData.thirdEvolution[i].name, 
              spriteUrl: data.evolutionData.thirdEvolution[i].spriteUrl, 
              fullName:  data.evolutionData.thirdEvolution[i].fullName};
          } else {
            evolvesTo = {name: 'None', spriteUrl: 'None', fullName: 'None'};
          }
          found = true;
          break;
        }
      }
      // if current pokemon is not first evolution or second evolution set evolvesTo to None
      if (!found) {
        for (let i = 0; i < thirdEvolutionArray.length; i++) {
          if (thirdEvolutionArray[i].name.includes(currentPokemonName)) {
            evolvesTo = {name: 'None', spriteUrl: 'None', fullName: 'None'};
            found = true;
            break;
          }
        }
      }
      // if current pokemon is not first evolution or second evolution or third evolution set evolvesTo to None
      if (!found) {
        evolvesTo = {name: 'None', spriteUrl: 'None', fullName: 'None'};
      }
    }
    
    // put evolvesFrom and evolvesTo into data.evolutionData
    data.evolutionData.evolvesFrom = evolvesFrom;
    data.evolutionData.evolvesTo = evolvesTo;
    
    return data;
    
  } catch (error) {
    console.error(error);
  }
};
// 