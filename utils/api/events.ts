import serverInstance from "./instance";

const getEvents = async () => {
  try {
    const res = await serverInstance.get("/events");

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getEvents };
