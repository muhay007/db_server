const Sequelize = require("sequelize");
const config = require("../config/config");
const Store = require("./Store");

const Product = config.define("Products", {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  price: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  },
});

module.exports = Product;
