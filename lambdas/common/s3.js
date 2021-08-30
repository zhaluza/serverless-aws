import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import streamToString from "../../utils/streamToString";

const s3Client = new S3Client();

export const s3 = {
  async get(fileName, bucket) {
    const params = {
      Bucket: bucket,
      Key: fileName,
    };
    let fileData = await s3Client.send(new GetObjectCommand(params));
    if (!fileData) {
      throw Error(
        `There was an error fetching the file using the file name ${fileName}`
      );
    }
    // if (fileName.slice(fileName.length - 5) === ".json") {
    //   console.log({ fileData });
    //   fileData = String(fileData.Body);
    // }
    const bodyContents = await streamToString(fileData.Body);
    return bodyContents;
  },
  async write(data, fileName, bucket) {
    const params = {
      Bucket: bucket,
      Body: JSON.stringify(data),
      Key: fileName,
    };
    try {
      const newData = await s3Client.send(new PutObjectCommand(params));
      if (!newData) {
        throw Error(`There was an error writing the file ${fileName}`);
      }
      return newData;
    } catch (err) {
      throw Error(err);
    }
  },
};
