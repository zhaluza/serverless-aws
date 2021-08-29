import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

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
};
