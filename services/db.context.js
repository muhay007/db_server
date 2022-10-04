//handle all table
const dotenv = require("dotenv").config();
const Store = require("../models/Store");
const User = require("../models/Users");
const Product = require("../models/Products");

Store.hasMany(Product, {
  foreignKey: "store_id",
  as: "product_items",
});

Product.belongsTo(Store, {
  foreignKey: "store_id",
  as: "store_info",
});

module.exports = { Store, User, Product };
