import serverInstance from "./instance";

const getCells = async () => {
  try {
    const res = await serverInstance.get("/cells");

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getCells };
