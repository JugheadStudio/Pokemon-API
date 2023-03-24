import axios from 'axios';

export const getPokemonData = async (pokemonName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = response.data;

    // console.log(pokemon);

    const data = {
      name: pokemon.name,
      ability: pokemon.abilities.map(ability => ability.ability.name),
      sprites: pokemon.sprites,
      officialArtwork: pokemon.sprites.other['official-artwork'].front_default,
      officialShiny: pokemon.sprites.other['official-artwork'].front_shiny,
      type: pokemon.types.map(type => type.type.name),
      typeUrl: pokemon.types.map(type => type.type.url),
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

    const growthRateResponse = await axios.get(pokemon.species.url);
    data.growthRate = growthRateResponse.data.growth_rate.name;

    const growthRateUrlResponse = await axios.get(pokemon.species.url);
    data.growthRateUrl = growthRateUrlResponse.data.growth_rate.url;

    const genusResponse = await axios.get(pokemon.species.url);
    data.species = genusResponse.data.genera[7] ? genusResponse.data.genera[7].genus : 'no species defined';   
    
    // Get evolution chain data
    const speciesResponse = await axios.get(pokemon.species.url);
    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    
    const evolutionData = await axios.get(evolutionChainUrl);
    const chain = evolutionData.data.chain;

    // console.log(chain);

    const firstEvolution = chain.species.name;
    const secondEvolutions = [];
    const thirdEvolutions = [];
    
    // Loop through second and third evolutions and add their names to arrays
    chain.evolves_to.forEach(evolution => {
      secondEvolutions.push(evolution.species.name);
      if (evolution.evolves_to[0]) {
        thirdEvolutions.push(evolution.evolves_to[0].species.name);
      }
    });
    
    const currentPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    console.log('firstEvolution:', firstEvolution);
    console.log('secondEvolutions:', secondEvolutions);
    console.log('thirdEvolutions:', thirdEvolutions);
    console.log('currentPokemon:', currentPokemon);
    
    // set which pokemon the current pokemon evolves from
    if (currentPokemon.data.name === firstEvolution) {
      data.evolvesFrom = {name: 'none', spriteUrl: 'none'};
      console.log('from: none');
    } else if (secondEvolutions.includes(currentPokemon.data.name)) {
      data.evolvesFrom = {name: firstEvolution, spriteUrl: 'none'};
      console.log('from: ' + data.evolvesFrom.name);
    } else if (thirdEvolutions.includes(currentPokemon.data.name)) {
      const secondEvolutionIndex = thirdEvolutions.indexOf(currentPokemon.data.name);
      data.evolvesFrom = {name: secondEvolutions[secondEvolutionIndex], spriteUrl: 'none'};
      console.log('from: ' + data.evolvesFrom.name);
    } else {
      data.evolvesFrom = 'none';
      console.log('from: none');
    }
    
    // set which pokemon the current pokemon evolves to
    if (currentPokemon.data.name === firstEvolution) {
      data.evolvesTo = {name: secondEvolutions[0], spriteUrl: 'none'};
      console.log('To: ' + data.evolvesTo.name);
    } else if (secondEvolutions.includes(currentPokemon.data.name)) {
      const currentIndex = secondEvolutions.indexOf(currentPokemon.data.name);
      if (thirdEvolutions[currentIndex]) {
        data.evolvesTo = {name: thirdEvolutions[currentIndex], spriteUrl: 'none'};
        console.log('To: ' + data.evolvesTo.name);
      } else if (currentIndex < secondEvolutions.length - 1) {
        data.evolvesTo = {name: secondEvolutions[currentIndex + 1], spriteUrl: 'none'};
        console.log('To: ' + data.evolvesTo.name);
      } else {
        data.evolvesTo = {name: 'none', spriteUrl: 'none'};
        console.log('To: none');
      }
    } else if (thirdEvolutions.includes(currentPokemon.data.name)) {
      data.evolvesTo = {name: 'none', spriteUrl: 'none'};
      console.log('To: none');
    } else {
      data.evolvesTo = 'none';
      console.log('To: none');
    }

    // fix for kubfu and urshifu ========================================
    if (currentPokemon.data.name === 'kubfu') {
      data.evolvesTo = {name: 'urshifu-single-strike', spriteUrl: 'none'};
    }

    if (currentPokemon.data.name === 'urshifu-single-strike') {
      data.evolvesFrom = {name: 'kubfu', spriteUrl: 'none'};
    }
    // =================================================================
    
    console.log('currentPokemon name:', currentPokemon.data.name);
    console.log('data.evolvesFrom:', data.evolvesFrom);
    console.log('data.evolvesTo:', data.evolvesTo);
    
    console.log(currentPokemon.data.name);
    console.log(data.evolvesFrom);
    //! Basculegion
    //! burmy
    //? nidoran male
    
    if (data.evolvesFrom && data.evolvesFrom.name !== 'none') {
      const evolvesFromUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.evolvesFrom.name}`);
      data.evolvesFrom = {
        name: data.evolvesFrom.name,
        spriteUrl: evolvesFromUrl.data.sprites.front_default
      }
    } else {
      data.evolvesFrom = {
        name: 'none',
        spriteUrl: null
      };
    }
    
    if (data.evolvesTo && data.evolvesTo.name && data.evolvesTo.name !== 'none') {
      const evolvesToUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon/${data.evolvesTo.name}`);
      data.evolvesTo.spriteUrl = evolvesToUrl.data.sprites.front_default;
    } else {
      data.evolvesTo = {
        name: 'none',
        spriteUrl: null
      };
    }
    
    
    return data;
    
  } catch (error) {
    console.error(error);
  }
};
