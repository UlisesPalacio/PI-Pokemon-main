const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
    //NO DEFINO ID POR QUE NO VAMOS A TENER OTRO TIPO DE DATOS DE TYPE,SALVO LOS QUE TENEMOS EN DB,LO VA A GENERAR SOLO.
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
