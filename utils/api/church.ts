import serverInstance from "./instance";

const getChurch = async () => {
  try {
    const res = await serverInstance.get("/church");

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

const getRoles = async () => {
  try {
    const res = await serverInstance.get("/roles");

    const returnRoles = res.data.data.filter(
      (r: { role_name: string }) => r.role_name !== "super_admin"
    );

    return { ...res.data, data: returnRoles };
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getChurch, getRoles };
