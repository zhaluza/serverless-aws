import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";

const dynamoClient = new DynamoDBClient();

export const dynamo = {
  async get(id, tableName) {
    const params = {
      TableName: tableName,
      Key: {
        ID: { S: id },
      },
    };
    try {
      const data = await dynamoClient.send(new GetItemCommand(params));
      if (!data || !data.Item) {
        throw Error(
          `There was an error fetching the data for ID ${id} of ${tableName}`
        );
      }
      return data.Item;
    } catch (err) {
      throw Error(err);
    }
  },
  async write(data, tableName) {
    const { ID, name, score } = data;
    if (!ID || !name || !score) throw Error("Missing required parameters");
    const params = {
      TableName: tableName,
      Item: { ID: { S: ID }, Name: { S: name }, Score: { S: score } },
    };
    try {
      const res = await dynamoClient.send(new PutItemCommand(params));
      if (!res)
        throw Error(`There was an error inserting ${name} into ${tableName}`);
      return { ID, Name: name, Score: score };
    } catch (err) {
      throw Error(err);
    }
  },
};
