'use strict';
import AWS = require('aws-sdk');

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