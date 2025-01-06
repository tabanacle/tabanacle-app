import serverInstance from "./instance";

const getGroups = async () => {
  try {
    const res = await serverInstance.get("/groups");

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getGroups };
