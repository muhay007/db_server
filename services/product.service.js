const Response = require("../utils/response.utils");
const Product = require("../models/Products");
const Store = require("../models/Store");
const {
  NOTFOUND_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  OK_MESSAGE,
} = require("../utils/message.util");
const { INTERNAL_SERVER_ERROR, NOTFOUND } = require("../utils/constant.util");

class ProductService extends Response {
  async getAllProductByStoreID() {
    try {
      let exist = await Store.findAll({
        include: { model: Product, as: "product_items" },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (exist.length != 0) {
        return this.RESPONSE(200, exist, "Success!");
      } else {
        return this.RESPONSE(404, [], "No Record Found!");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }

  async getProductIDWithStoreInfo(productID) {
    try {
      let exist = await Product.findOne({
        where: { id: productID },
        include: [{ model: Store, as: "store_info" }],
      });
      if (exist != null) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, {}, NOTFOUND_MESSAGE);
      }
    } catch (err) {
      return this.RESPONSE(
        INTERNAL_SERVER_ERROR,
        err,
        INTERNAL_SERVER_ERROR_MESSAGE
      );
    }
  }

  async getAllProducts(offset, limit, sort, order) {
    try {
      let exist = await Product.findAll({
        offset: offset,
        limit: limit,
        order: [[sort, order]],
      });
      if (exist.length != 0) {
        return this.RESPONSE(OK, exist, OK_MESSAGE);
      } else {
        return this.RESPONSE(NOTFOUND, [], NOTFOUND_MESSAGE);
      }
    } catch (err) {
      return this.RESPONSE(
        INTERNAL_SERVER_ERROR,
        err,
        INTERNAL_SERVER_ERROR_MESSAGE
      );
    }
  }
}

module.exports = new ProductService();
