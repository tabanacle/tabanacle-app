import serverInstance from "./instance";

const getDepartments = async () => {
  try {
    const res = await serverInstance.get("/departments");

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getDepartments };
