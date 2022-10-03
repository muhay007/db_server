const dotenv = require("dotenv").config();
const Response = require("../utils/response.utils");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const {
  OK,
  CREATED,
  UPDATE,
  NOTFOUND,
  BADREQUEST,
  INTERNAL_SERVER_ERROR,
} = require("../utils/constant.util");
const {
  OK_MESSAGE,
  CREATED_MESSAGE,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  SEARCH_MESSAGE,
  NOTFOUND_MESSAGE,
  BADREQUEST_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  USER_EXIST,
} = require("../utils/message.util");
const AuthService = require("./auth.service");

class UserService extends Response {
  async login(requestObject) {
    try {
      let exist = await User.findOne({
        where: { username: requestObject.username },
      });
      if (exist != null) {
        let passwordConfirm = await bcrypt.compare(
          requestObject.password,
          exist["dataValues"].password
        );
        if (passwordConfirm == true) {
          console.log(exist["dataValues"]);
          let token = await AuthService.auth(exist["dataValues"]);
          return this.RESPONSE(OK, token.response, OK_MESSAGE);
        } else {
          return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
        }
      } else {
        return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
      }
    } catch (err) {
      return this.RESPONSE(
        INTERNAL_SERVER_ERROR,
        err,
        INTERNAL_SERVER_ERROR_MESSAGE
      );
    }
  }

  async signup(requestObject) {
    try {
      if (requestObject != null) {
        let exist = await User.findOne({
          where: { username: requestObject.username },
        });
        if (exist != null) {
          return this.RESPONSE(BADREQUEST, {}, BADREQUEST_USER_ALREADY_EXIST);
        }
        if (requestObject.password == requestObject.confirmPassword) {
          let hashPassword = await bcrypt.hash(requestObject.password, 10);
          let response = await User.create({
            username: requestObject.username,
            password: hashPassword,
            is_active: true,
          });

          if (response != null) {
            return this.RESPONSE(OK, response, OK_MESSAGE);
          } else {
            return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
          }
        } else {
          return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
        }
      } else {
        return this.RESPONSE(BADREQUEST, {}, BADREQUEST_MESSAGE);
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

module.exports = new UserService();
