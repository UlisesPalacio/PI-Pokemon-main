const PokeDelete = require("express").Router();
const { Pokemon } = require("../db.js");
const { Op } = require("sequelize");

PokeDelete.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonDelete = await Pokemon.findByPk(id);
    if (!pokemonDelete) {
      res.status(400).send("No existe el pokemon que deseas eliminar");
    } else {
      pokemonDelete.destroy();
      return res.status(200).send("Pokemon eliminado correctamente");
    }
  } catch (error) {
    res.status(400).json({ error: error.message }, "Entré al error de delete");
  }
});

module.exports = PokeDelete;


//En este ejemplo, la expresión regular verifica si el id es un número entero (^[0-9]+$) o un uuid (^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$). Si el id coincide con uno de los dos formatos, se puede continuar con la eliminación. Si no, se devuelve un error indicando que el id no es válido.

//Por lo tanto, puedes usar el siguiente código para eliminar el id integer o uuid en tu ruta:

