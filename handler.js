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

module.exports.addPeople = async (event) => {
  const body = querystring.parse(event["body"])
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Create people",
        input: `Hello ${body.createpeople}`,
      },
      null,
      2
    ),
  };
};

module.exports.listPeople = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb.scan({ TableName: "People" }).promise();

  const list = result.Items;

  return {
    status: 200,
    body: {
      list,
    },
  };
};


module.exports.getPeople = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const result = await dynamodb
    .get({
      TableName: "People",
      Key: { id },
    })
    .promise();

  const task = result.Item;

  return {
    status: 200,
    body: people,
  };
};

module.exports.updatePeople = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { done } = JSON.parse(event.body);

  await dynamodb
    .update({
      TableName: "People",
      Key: { id },
      UpdateExpression: "set done = :done",
      ExpressionAttributeValues: {
        ":done": done,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "people updated",
    }),
  };
};

module.exports.deletePeople = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName: "People",
      Key: {
        id,
      },
    })
    .promise();

  return {
    status: 200,
    body: {
      message: 'Deleted people'
    }
  };
};
