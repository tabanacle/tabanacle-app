import { getAllMembers } from "@/utils/api/members";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { FC } from "react";
import Pagination from "../Shared/Pagination";
import Spinner from "../Shared/Spinner";
import Table from "../Shared/Table";
import { PaginatedTableHeader } from "../Shared/Table/TableTypes";

const AllMembers: FC = () => {
  const router = useRouter();
  const { data: allMembers, isLoading: allMembersLoading } = useQuery({
    queryKey: [
      "all-members",
      router.query?.page,
      router.query?.gender,
      router.query?.date,
      `${router.query?.["start-date"]} - ${router.query?.["end-date"]}`,
      router.query?.search,
    ],
    queryFn: () =>
      getAllMembers({
        page: router.query?.page as string,
        gender: router.query?.gender as string,
        date_filter: router.query?.date as string,
        start_date: router.query?.["start-date"] as string,
        end_date: router.query?.["end-date"] as string,
        search: router.query?.search as string,
      }),
    enabled: !!router.query?.page,
    refetchOnWindowFocus: false,
    staleTime: 900000,
  });

  const headers: Array<PaginatedTableHeader<any>> = [
    // {
    //   id: 1,
    //   label: "Findings",
    //   render: row => (
    //     <div className="flex items-center gap-1.5 lg:gap-2 lg:w-[40rem] py-1.2 pr-1.6">
    //       <Checkbox
    //         id={row.pk}
    //         text={
    //           <p className="text-[#F8F8F8] font-bold text-1.2 lg:text-1.6 leading-[1.5rem] lg:leading-2 first-letter:capitalize text-left">
    //             {row.executive_summary}
    //           </p>
    //         }
    //         setValue={() => null}
    //         disabled
    //         value={selectedRetests.map(test => test.pk).includes(row.pk)}
    //       />
    //     </div>
    //   ),
    // },
    {
      id: 2,
      label: "Name",
      render: (row) => (
        <p className="text-small text-black text-left">{`${row.first_name} ${
          row.last_name || ""
        } ${row.other_names || ""}`}</p>
      ),
    },
    {
      id: 3,
      label: "Phone",
      value: "phone_number",
    },
    {
      id: 4,
      label: "Email",
      render: (row) => (
        <p className="text-small text-black text-left">
          {row.email_address || "N/A"}
        </p>
      ),
    },
    {
      id: 5,
      label: "Gender",
      render: (row) => (
        <p className="text-small text-black text-left capitalize">
          {row.gender || "N/A"}
        </p>
      ),
    },
    {
      id: 6,
      label: "DoB",
      render: (row) => (
        <p className="text-small text-black text-left capitalize">
          {row.date_of_birth
            ? dayjs(row.date_of_birth).format("DD MMM")
            : "N/A"}
        </p>
      ),
    },
  ];

  if (allMembersLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-2 h-20">
        <Spinner color="#000000CC" width={50} height={50} />

        <p className="text-normal text-black">...Fetching your members</p>
      </div>
    );

  return (
    <>
      <div className="flex flex-col gap-1.2">
        <Table headers={headers} paginator={allMembers?.data} />

        <Pagination
          currentPage={allMembers?.meta.currentPage}
          nextPage={allMembers?.meta.nextPage}
          prevPage={allMembers?.meta.previousPage}
          totalPages={allMembers?.meta.totalPages}
        />
      </div>
    </>
  );
};

export default AllMembers;
