const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,//campo requerido 
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 150 },
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 150 },
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 150 },
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 150 },
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    //ESTO SIRVE PARA HACER UN LLAMADO A LOS QUE TRAE LA BASE DE DATOS.
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
