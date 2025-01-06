import DashbordLayout from "@/components/Layout/DashbordLayout";
import MultiPageLayout from "@/components/Layout/MultiPageLayout";
import AddNewMemberModal from "@/components/Members/AddNewMemberModal";
import AllMembers from "@/components/Members/AllMembers";
import MembersFilters from "@/components/Members/MembersFilters";
import Close from "@/components/Shared/Icons/Close";
import FunnelSimple from "@/components/Shared/Icons/FunnelSimple";
import FunnelSimpleX from "@/components/Shared/Icons/FunnelSimpleX";
import MagnifyingGlass from "@/components/Shared/Icons/MagnifyingGlass";
import Plus from "@/components/Shared/Icons/Plus";
import Input from "@/components/Shared/Input";
import useDisclosure from "@/utils/hooks/useDisclosure";
import useQueryString from "@/utils/hooks/useQueryString";
import { GetServerSidePropsContext, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export const pageLinks = [
  {
    id: 1,
    title: "All",
    sub: "",
    link: "/members",
  },
  {
    id: 2,
    title: "First timers",
    sub: "first-timers",
    link: "/members/first-timers",
  },
  {
    id: 3,
    title: "Second timers",
    sub: "second-timers",
    link: "/members/second-timers",
  },
];

const Members: NextPage<{
  query: {
    date: string;
    "start-date": string;
    "end-date": string;
    gender: string;
    search: string;
  };
}> = (props) => {
  const router = useRouter();
  const [pageView, setPageView] = useState("list");
  const [search, setSearch] = useState(props.query.search || "");

  const { updateQueryString } = useQueryString();

  const addNewMemberModal = useDisclosure();
  const membersFilters = useDisclosure();

  useEffect(() => {
    if (router.isReady && !router.query?.page)
      router.replace({ pathname: router.pathname, query: { page: "1" } });
  }, [router]);

  const filters = Object.keys(router.query || []).filter(
    (f) => !["page", "search"].includes(f)
  );

  const searchTable = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    router.push({
      pathname: router.pathname,
      query: { ...router.query, search },
    });
  };

  return (
    <>
      <DashbordLayout>
        <MultiPageLayout
          links={pageLinks}
          subPage="subMembers"
          pageView={pageView}
          setPageView={setPageView}
        >
          <div className="flex flex-col gap-1.2">
            <div className="flex flex-col xxs:flex-row xxs:items-center justify-between gap-1.6 p-0.8 rounded-0.8 bg-bg-2">
              <div className="flex items-center gap-0.8">
                <button
                  type="button"
                  className="relative inline-flex items-center justify-center w-2.8 h-2.8 [&>svg]:w-2 [&>svg]:h-2 group
                  focus:outline-none"
                  onClick={addNewMemberModal.onOpen}
                >
                  <Plus />
                  <span
                    className="absolute -top-2 left-0 bg-black text-small text-white p-0.4 w-max rounded-0.4 scale-0
                    group-hover:scale-100 group-focus:scale-100 transition-all duration-300 origin-bottom-left"
                  >
                    Add New
                  </span>
                </button>

                <button
                  type="button"
                  className="inline-flex items-center justify-center w-2.8 h-2.8 [&>svg]:w-2 [&>svg]:h-2 relative focus:outline-none group"
                  onClick={membersFilters.onOpen}
                >
                  {filters.length ? (
                    <span className="absolute bottom-0 -right-0.4 min-w-1.6 h-1.6 bg-red-light rounded-full text-white text-small">
                      {filters.length}
                    </span>
                  ) : null}
                  <FunnelSimple />
                  <span
                    className="absolute -top-2 left-0 bg-black text-small text-white p-0.4 w-max rounded-0.4 scale-0
                    group-hover:scale-100 group-focus:scale-100 transition-all duration-300 origin-bottom-left"
                  >
                    Filters
                  </span>
                </button>
                {filters.length ? (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-2.8 h-2.8 [&>svg]:w-2 [&>svg]:h-2"
                    onClick={() =>
                      router.push({
                        pathname: router.pathname,
                        query: { page: router.query?.page || "1" },
                      })
                    }
                  >
                    <FunnelSimpleX color="#FF4747" />
                  </button>
                ) : null}
              </div>

              <form onSubmit={searchTable}>
                <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  containerClass="xxs:w-20"
                  className="w-full pl-0.8 h-2.8 rounded-0.8 text-normal"
                  leftIcon={<MagnifyingGlass color="#00000033" />}
                  rightIcon={
                    search ? (
                      <button
                        type="button"
                        className="[&>svg]:w-1.6 [&>svg]:h-1.6 flex items-center focus:outline-none"
                        onClick={() => {
                          setSearch("");
                          updateQueryString({ ...router.query, search: "" });
                        }}
                      >
                        <Close />
                      </button>
                    ) : undefined
                  }
                />
              </form>
            </div>

            <AllMembers />
          </div>
        </MultiPageLayout>
      </DashbordLayout>

      <MembersFilters
        isOpen={membersFilters.isOpen}
        onClose={membersFilters.onClose}
        queryParams={props.query}
      />

      <AddNewMemberModal isOpen onClose={addNewMemberModal.onClose} />
    </>
  );
};

export default Members;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx;

  return { props: { query } };
}
