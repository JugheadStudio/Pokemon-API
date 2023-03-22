import axios from 'axios';

export const getPokemonData = async (pokemonName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = response.data;

    // console.log(pokemon);

    const data = {
      name: pokemon.name,
      sprites: pokemon.sprites,
      officialArtwork: pokemon.sprites.other['official-artwork'].front_default,
      officialShiny: pokemon.sprites.other['official-artwork'].front_shiny,
      type: pokemon.types.map(type => type.type.name),
      typeUrls: pokemon.types.map(type => type.type.url),
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

    const growthRateResponse = await axios.get(pokemon.species.url);
    data.growthRate = growthRateResponse.data.growth_rate.name;

    const growthRateUrlResponse = await axios.get(pokemon.species.url);
    data.growthRateUrl = growthRateUrlResponse.data.growth_rate.url;

    const genusResponse = await axios.get(pokemon.species.url);
    data.species = genusResponse.data.genera[7].genus;
    return data;
  } catch (error) {
    console.error(error);
  }
};
