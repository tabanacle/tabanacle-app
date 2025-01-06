import { buildUrl } from "../helpers";
import serverInstance from "./instance";

const getAllMembers = async (arg: {
  page: string;
  gender: string;
  date_filter: string;
  start_date: string;
  end_date: string;
  search: string;
}) => {
  const { page, gender, date_filter, start_date, end_date, search } = arg;

  try {
    const res = await serverInstance.get(
      buildUrl("/members", [
        {
          page,
          gender,
          date_filter,
          start_date,
          end_date,
          search,
        },
      ])
    );

    return res.data;
  } catch (error) {
    console.log(`Error: ${error}`);
    throw error;
  }
};

export { getAllMembers };
