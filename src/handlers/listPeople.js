'use strict';
const AWS = require("aws-sdk");

module.exports.listpeople = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
  
    const params = {
      TableName: "peopleTable"
    }

    try {
      const data = await dynamodb.scan(params).promise();
    
      const list = data.Items;
    
      return {
        status: 200,
        body: list
      };
    } catch (error) {
      return {
        status: 500,
        body: JSON.stringify({
          message: "error to list people "+error.message,
          },
          null,
          2
        ),
      };
    }

    
  };
