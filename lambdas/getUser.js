const responses = require("../common/apiResponses");

exports.handler = async (event) => {
  console.log("event:", event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // Failed without an id
    return responses._400({ message: "missing ID from path" });
  }

  const ID = event.pathParameters.ID;
  if (data[ID]) {
    // Return the data
    return responses._200(data[ID]);
  }

  // Failed - ID wasn't in the data
  return responses._400({ message: "no ID in data" });
};

const data = {
  1: { name: "Tom Jones", age: 25, job: "journalist" },
  2: { name: "David Bowie", age: 22, job: "alien" },
  3: { name: "Esperanza Daniels", age: 45, job: "mechanic" },
};
