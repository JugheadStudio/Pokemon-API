import axios from 'axios';

// Get the pokemon data from the pokeapi
export const getPokemonData2 = async (pokemonName2) => {
  try {
    // Get the pokemon data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName2}`);
    const pokemon = response.data;

    // Get all the data we need from the pokemon data and store it in a new object that can be imported into all the pages that need it
    const data2 = {
      name: pokemon.name,
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
    data2.growthRate = growthRateResponse.data.growth_rate.name;

    // Get the growth rate data
    const growthRateUrlResponse = await axios.get(pokemon.species.url);
    data2.growthRateUrl = growthRateUrlResponse.data.growth_rate.url;

    // Get the species data
    const genusResponse = await axios.get(pokemon.species.url);
    data2.species = genusResponse.data.genera[7] ? genusResponse.data.genera[7].genus : 'no species defined'; 

    return data2;
    
  } catch (error) {
    console.error(error);
  }
};
