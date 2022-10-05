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
        include: { model: Store, as: "store_info" },
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

  async getAllProducts(offset, limit, sort, order) {
    try {
      let exist = await Product.findAll({
        offset: offset,
        limit: limit,
        order: sort[order],
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

  //create product
  async createProduct(requestObject) {
    try {
      let exist = await Product.findOne({
        where: { name: requestObject.name },
      });
      if (exist == null) {
        let createData = await Product.create(requestObject);
        if (createData !== null) {
          return this.RESPONSE(200, createData, "Product created successfully");
        } else {
          return this.RESPONSE(400, {}, "Failed to create product");
        }
      } else {
        return this.RESPONSE(200, exist, "Product already exist");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }

  //update product
  async updateProduct(requestObject) {
    try {
      let exist = await Product.findOne({ where: { id: requestObject.id } });
      if (exist != null) {
        let updateData = await Product.update(requestObject, {
          where: { id: requestObject.id },
        });
        if (updateData != null) {
          return this.RESPONSE(202, updateData, "Product update successfully");
        } else {
          return this.RESPONSE(400, {}, "Failed to update product");
        }
      } else {
        return this.RESPONSE(404, {}, "Product not found");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }

  //delete product
  async deleteProduct(requestObject) {
    try {
      let exist = await Product.findOne({ where: { id: requestObject } });
      if (exist != null) {
        let removeData = await Product.destroy({
          where: { id: requestObject },
        });
        if (removeData != null) {
          return this.RESPONSE(200, {}, "Product deleted successfully");
        } else {
          return this.RESPONSE(400, {}, "Failed to delete product");
        }
      } else {
        return this.RESPONSE(404, {}, "Product not found");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }
}

module.exports = new ProductService();
