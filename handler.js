'use strict';

const querystring = require("querystring")
const AWS = require("aws-sdk");
const uuid = require("uuid");

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Serverless desplegado con exito',
        input: event,
      },
      null,
      2
    ),
  };
};
