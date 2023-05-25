const axios = require("axios");
const { Pokemon, Type } = require("./db");

//FUNCIONES CONTROLADORAS QUE ME TRAIGAN INFORMACION Y DESPUES EN LAS RUTAS INVOCARLAS.
//INFORMACION QUE VIENE DE LA API.

const getApiInfo = async () => {
  const primerosPokemons = await axios.get("https://pokeapi.co/api/v2/pokemon");//Axios es una biblioteca de JavaScript que proporciona una interfaz simple y fácil de usar para realizar solicitudes HTTP desde el navegador o desde Node.js,
                                                                                // con compatibilidad para Promises y una serie de características útiles para manejar solicitudes y respuestas de manera eficiente.
  const segundosPokemons = await axios.get(primerosPokemons.data.next);
  const tercerosPokemons = await axios.get(segundosPokemons.data.next);
  const cuartosPokemons = await axios.get(tercerosPokemons.data.next);
  const quintosPokemons = await axios.get(cuartosPokemons.data.next);
  const sextosPokemons = await axios.get(quintosPokemons.data.next);
  const allPokemons = [
    ...primerosPokemons.data.results,
    ...segundosPokemons.data.results,
    ...tercerosPokemons.data.results,
    ...cuartosPokemons.data.results,
    ...quintosPokemons.data.results,
    ...sextosPokemons.data.results,
  ];

  const infoPokemons = await Promise.all(
                                                //Una Promise que se cumplirá cuando todas las promesas del argumento iterable hayan sido cumplidas, o bien se rechazará cuando alguna de ellas se rechace.
    allPokemons.map(async (pokemon) => {
      let infoDePokemon = await axios.get(pokemon.url);
      return {
        id: infoDePokemon.data.id,
        name: infoDePokemon.data.name,
        hp: infoDePokemon.data.stats[0].base_stat,
        attack: infoDePokemon.data.stats[1].base_stat,
        defense: infoDePokemon.data.stats[2].base_stat,
        speed: infoDePokemon.data.stats[5].base_stat,
        height: infoDePokemon.data.height,
        weight: infoDePokemon.data.weight,
        image: infoDePokemon.data.sprites.other.dream_world.front_default,
        types: infoDePokemon.data.types.map((t) => t.type.name),
      };
    })
  );
  return infoPokemons;
};

//DEVOLVER LOS DATOS QUE YO NECESITO TRAERME DESDE EL BACK.
//INFORMACION QUE VIENE DE LA BASE DE DATOS.

const getDbInfo = async () => {
  const pokemonsDB = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],                                                         //le pasamos solo el name treme solo lo que tiene el atributo y no todo lo que tiene el modelo
      through: {
        attributes: [],
      },
    },
  });

  const pokemonsMapeados = pokemonsDB?.map((pokemon) => {                 //devolvemos objetos mas simplesque contineen solo datos relevantes
    const { types } = pokemon;
    const pokemonData = {
      ...pokemon.dataValues,
      types: types.map((t) => t.name),
    };
    return pokemonData;
  });
  return pokemonsMapeados;
};

const getAllPokemons = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const totalInfo = apiInfo.concat(dbInfo);
  return totalInfo;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllPokemons,
};

