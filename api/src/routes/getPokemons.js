const getPokemons = require("express").Router();//Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).9 mar 2023
const { getAllPokemons } = require("../controllers");

//aca asumimos que ya tenemos un /pokemons por eso no le pasamos nada.si yo le paso ahora /pokemons seria /pokemonspokemons.
getPokemons.get("/", async (req, res) => {
  const name = req.query.name; //en el front busco por nombre para el detalle.(buscar si un hay un query para esta propiedad).
  const pokemonsTotal = await getAllPokemons();
  if (name) {
    const pokemonName = await pokemonsTotal.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    pokemonName.length
      ? res.status(200).send(pokemonName)
      : res.status(404).send("The pokemon does not exist");
  } else {
    res.status(200).send(pokemonsTotal); //caso en el que no haya un query, mandamos todos los pokemons.
  }
  res.end();
});

getPokemons.get("/:id", async (req, res) => {
  const id = req.params.id;
  const pokemonsTotal = await getAllPokemons();
  if (id) {
    let pokemonId = await pokemonsTotal.filter((el) => el.id == id);
    pokemonId.length
      ? res.status(200).json(pokemonId)
      : res.status(404).send("That pokemon was not found");
  }
  res.end();
});



module.exports = getPokemons;
