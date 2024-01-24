'use strict';
const AWS = require("aws-sdk");


module.exports.addPeople =async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  try {
    const data = JSON.parse(event.body);
    const params = {
      TableName: "peopleTable",
      Item: {
        nombre: data.nombre,
        estatura: data.estatura,
      }
    };
    
    const res = await dynamodb.put(params).promise();
    
    return {
      status: 200,
      body: res.Item
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error creating people::'+error.message,
        },
        null,
        2
      ),
    };
  }
}