const postPokemons = require("express").Router();
const { Pokemon, Type } = require("../db");

postPokemons.post("/", async (req, res) => {
  const {
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb, // por default viene en true, en insomnia no se la paso pero me tiene que llegar.
    types,
  } = req.body;
  const pokemonCreated = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb,
  });
  //ACA NO LE PASAMOS type por que tenemos que hacer la relacion aparte.

  const typeDb = await Type.findAll({
    //DENTRO DEL MODELO Type ENCONTRA TODOS LOS Types QUE COINCIDAN CON type que le estoy pasando por body.
    where: { name: types },
  });
  pokemonCreated.addType(typeDb); //metodo de sequelize = addType lo que hace es traerme de la tabla lo que le paso osea typeDb.
  res.send("Successfully created pokemon");
});

module.exports = postPokemons;
