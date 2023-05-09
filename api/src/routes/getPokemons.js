const getPokemons = require("express").Router();
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

//DELETE Y PUT

// deletePokemons.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const pokemonDelete = await Pokemon.findByPk(id);
//     if (!pokemonDelete) {
//       res.status(400).send("No existe el pokemon que deseas eliminar");
//     } else {
//       pokemonDelete.destroy();
//       return res.status(200).send("Pokemon eliminado correctamente");
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message }, "Entré al error de delete");
//   }
// });

// putPokemons.put("/edit/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       hp,
//       attack,
//       defense,
//       speed,
//       height,
//       weight,
//       image,
//       types,
//       createdInDb,
//     } = req.body;
//     if (id) {
//       let urlDeImagen = "";

//       if (image) {
//         urlDeImagen = image;
//       } else {
//         urlDeImagen =
//           "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
//       }

//       if (name) {
//         const findPokemon = await Pokemon.findByPk(id);
//         await findPokemon.update(
//           {
//             name,
//             hp,
//             attack,
//             defense,
//             speed,
//             height: Number(height),
//             weight: Number(weight),
//             image: urlDeImagen,
//             createdInDb,
//           },
//           { where: { id: id } }
//         );

//         const typeDb = await Type.findAll({
//           where: { name: types },
//         });

//         await findPokemon.setTypes(typeDb);
//         res.status(200).send("Pokemon modificado con exito");
//       } else {
//         res.status(400).send("Faltaron datos para modificar el pokemon");
//       }
//     }
//   } catch (error) {
//     console.log("entre al error del put", error);
//   }
// });

module.exports = getPokemons;
