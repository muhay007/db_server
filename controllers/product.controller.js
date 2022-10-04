const ProductService = require("../services/product.service");

class ProductController {
  async getAllProductByStoreID() {
    let response = await ProductService.getAllProductByStoreID();
    return response;
  }

  async getProductIDWithStoreInfo(productID) {
    let response = await ProductService.getProductIDWithStoreInfo(productID);
    return response;
  }

  async getAllProducts(requestObject) {
    let offset =
      requestObject.offset != null || requestObject.offset !== undefined
        ? parseInt(requestObject.offset)
        : 0;
    let limit =
      requestObject.limit != null || requestObject.limit !== undefined
        ? parseInt(requestObject.limit)
        : 5;
    let sort =
      requestObject.sort != null || requestObject.sort !== undefined
        ? parseInt(requestObject.sort)
        : "id";
    let order =
      requestObject.order != null || requestObject.order !== undefined
        ? parseInt(requestObject.order)
        : "ASC";
    let response = await ProductService.getAllProducts(
      offset,
      limit,
      sort,
      order
    );
    return response;
  }
}

module.exports = new ProductController();
