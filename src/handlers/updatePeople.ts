'use strict';
import AWS = require('aws-sdk')

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