import responses from "../common/apiResponses";
import { dynamo } from "../common/dynamo";

const tableName = process.env.tableName || "";

exports.handler = async (event) => {
  console.log("event:", event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // Failed without an id
    return responses._400({ message: "missing ID from path" });
  }

  const id = event.pathParameters.ID;

  try {
    const user = await dynamo.get(id, tableName);
    if (!user) return responses._400({ message: "Failed to get user by ID" });
    return responses._200({ user });
  } catch (err) {
    console.log("error with Dynamo get:", err);
    return null;
  }
};
