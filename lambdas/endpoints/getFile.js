import responses from "../common/apiResponses";
import { s3 } from "../common/s3";

const bucket = process.env.bucketName || "";

exports.handler = async (event) => {
  console.log("event:", event);

  if (!event.pathParameters || !event.pathParameters.fileName) {
    // Failed without a file name
    return responses._400({ message: "Missing the file name from the path" });
  }

  const { fileName } = event.pathParameters;
  try {
    const file = await s3.get(fileName, bucket);
    if (!file) {
      return responses._400({ message: "Failed to get file by file name" });
    }
    return responses._200({ file });
  } catch (err) {
    console.log("error with S3 get:", err);
    return null;
  }
};
