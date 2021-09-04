import responses from "../common/apiResponses";

exports.handler = async (event) => {
  console.log("event:", event);

  return responses._200();
};
