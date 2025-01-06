import serverInstance from "./instance";

const getCountries = async () => {
  try {
    const res = await serverInstance.get("/countries");

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

const getStates = async (countryId: number) => {
  try {
    const res = await serverInstance.get(`/states/${countryId}`);

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

const getCities = async (stateId: number) => {
  try {
    const res = await serverInstance.get(`/cities/${stateId}`);

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getCountries, getStates, getCities };
