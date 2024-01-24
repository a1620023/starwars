'use strict';
const AWS = require("aws-sdk");


module.exports.getPeople = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    try {
      const nombre  = event.pathParameters;
  
      const params = {
        TableName: "peopleTable",
        Key: { nombre },
      }

      const result = await dynamodb.get(params).promise();    
      const people = result.Item;
    
      return {
        status: 200,
        body: people,
      };
    } catch (error) {
      return {
        status: 500,
        body: JSON.stringify(
          {
            message: 'Error reading people::'+error.message,
          },
          null,
          2
        ),
      };
    }
    
  };