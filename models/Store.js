const Sequelize = require("sequelize");
const config = require("../config/config");

const Store = config.define("Stores", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Store;
