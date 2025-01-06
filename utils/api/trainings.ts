import serverInstance from "./instance";

const getTrainings = async () => {
  try {
    const res = await serverInstance.get("/trainings");

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getTrainings };
