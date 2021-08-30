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
  const data = JSON.parse(event.body);

  try {
    const newData = await s3.write(data, fileName, bucket);
    if (!newData) {
      return responses._400({ message: "Failed to write data by file name" });
    }
    return responses._200({ newData });
  } catch (err) {
    console.log("error with S3 write:", err);
    return null;
  }
};
