const getTypes = require("express").Router();
const { Type } = require("../db");
const { getAllPokemons } = require("../controllers");

getTypes.get("/", async (req, res) => {
  const cantidadTypes = await Type.count(); //La función count() se usa para contar el número de colecciones en el elemento
  if (!cantidadTypes) {
    console.log("Los tuve que crear");
    const allMyPokemons = await getAllPokemons();
    const pokemonTypes = allMyPokemons.map((pokemon) => pokemon.types);
    const myTypes = pokemonTypes.flat(); // Nuevo arreglo con los elem. de los sub arreglos concatenados -> [[1, 2], [3, 2]] -> [1, 2, 3, 2]
    //El flat() método crea una nueva matriz con todos los elementos de la submatriz concatenados recursivamente hasta la profundidad especificada.
    const mySetTypes = [...new Set(myTypes)]; // Me elimina los repetidos(set solo acepta valores unicos) -> [1, 2, 3, 2] -> [1, 2, 3]
    // res.status(200).send(mySetTypes);
    mySetTypes.forEach((type) => {
      console.log(mySetTypes);
      Type.findOrCreate({ where: { name: type } }); // Busca en la tabla type, en la columna name si tiene el type, sino lo crea.
    });
    const theTypes = await Type.findAll();
    res.status(200).send(theTypes);
  } else {
    console.log("Ya los tenia asi que no los cree");
    // const allTypes = await Type.findAll(); // Trae todos los datos de la tabla type.
    const theTypes = await Type.findAll();
    res.status(200).send(theTypes);
  }
});

module.exports = getTypes;

//ENTRAMOS A LA API,ME TRAIGO LA INFO DE LA API,LA MAPEO, HAGO UN findOrCreate DENTRO DEL MODELO Y ME GUARDA TODAS ESOS Types EN EL MODELO.
//ESTO SE HACE SOLO UNA VEZ AL TENER EL FORCE EN FALSE.ME TRAIGO LA INFO DE LA API PARA GUARDARLA EN LA DB Y SACARLA DESDE AHI.
