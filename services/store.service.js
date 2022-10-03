const Response = require("../utils/response.utils");
const Store = require("../models/Store");

class StoreService extends Response {
  //get all store
  async getAllStore() {
    try {
      let exist = await Store.findAll();
      if (exist.length != 0) {
        return this.RESPONSE(200, exist, "Success!");
      } else {
        return this.RESPONSE(404, [], "No Record Found!");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }

  //get one store
  async getOneStore(requestObject) {
    try {
      let exist = await Store.findOne({ where: { id: requestObject } });
      if (exist !== null) {
        return this.RESPONSE(200, exist, "Record found");
      } else {
        return this.RESPONSE(404, {}, "No record found");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }

  //create store
  async createStore(requestObject) {
    try {
      let exist = await Store.findOne({ where: { name: requestObject.name } });
      if (exist == null) {
        let createData = await Store.create(requestObject);
        if (createData !== null) {
          return this.RESPONSE(200, createData, "Store created successfully");
        } else {
          return this.RESPONSE(400, {}, "Failed to create record");
        }
      } else {
        return this.RESPONSE(200, exist, "Already exist");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }

  //update store
  async updateStore(requestObject) {
    try {
      let exist = await Store.findOne({ where: { id: requestObject.id } });
      if (exist != null) {
        let updateData = await Store.update(requestObject, {
          where: { id: requestObject.id },
        });
        if (updateData != null) {
          return this.RESPONSE(202, updateData, "Successfully updated");
        } else {
          return this.RESPONSE(400, {}, "failed to update data");
        }
      } else {
        return this.RESPONSE(404, {}, "record not found");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }

  //delete store
  async deleteStore(requestObject) {
    try {
      let exist = await Store.findOne({ where: { id: requestObject } });
      if (exist != null) {
        let removeData = await Store.destroy({ where: { id: requestObject } });
        if (removeData != null) {
          return this.RESPONSE(200, {}, "Successfully deleted");
        } else {
          return this.RESPONSE(400, {}, "failed to delete data");
        }
      } else {
        return this.RESPONSE(404, {}, "record not found");
      }
    } catch (error) {
      return this.RESPONSE(500, {}, "Internal Server Error");
    }
  }
}

module.exports = new StoreService();
