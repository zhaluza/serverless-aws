import responses from "../common/apiResponses";
import { dynamo } from "../common/dynamo";
import { v4 as uuid } from "uuid";

const tableName = process.env.tableName || "";

exports.handler = async (event) => {
  console.log("event:", event);

  try {
    const user = JSON.parse(event.body);
    user.ID = uuid();
    const newUser = await dynamo.write(user, tableName);
    if (!newUser) {
      return responses._400({ message: "Failed to write user" });
    }
    return responses._200({ newUser });
  } catch (err) {
    console.log("error with Dynamo write:", err);
    return null;
  }
};
