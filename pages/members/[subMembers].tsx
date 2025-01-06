import DashbordLayout from "@/components/Layout/DashbordLayout";
import { useRouter } from "next/router";
import { pageLinks } from ".";
import MultiPageLayout from "@/components/Layout/MultiPageLayout";
import { useEffect, useState } from "react";

const SubMembers = () => {
  const router = useRouter();
  const [pageView, setPageView] = useState("list");

  useEffect(() => {
    if (router.isReady && !router.query?.page)
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, page: "1" },
      });
  }, [router]);

  return (
    <DashbordLayout>
      <MultiPageLayout
        links={pageLinks}
        subPage="subMembers"
        pageView={pageView}
        setPageView={setPageView}
      >
        {router.query?.subMembers}
      </MultiPageLayout>
    </DashbordLayout>
  );
};

export default SubMembers;
