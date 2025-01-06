import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import ChartPieSlice from "../Shared/Icons/ChartPieSlice";
import ChartPieSliceFilled from "../Shared/Icons/ChartPieSliceFilled";
import Users from "../Shared/Icons/Users";
import UsersFilled from "../Shared/Icons/UsersFilled";
import Notifications from "./Notifications";
import useDisclosure from "@/utils/hooks/useDisclosure";
import Button from "../Shared/Button";
import List from "../Shared/Icons/List";
import Close from "../Shared/Icons/Close";

interface DashboardlayoutProps {
  children: ReactNode;
}

const DashbordLayout: FC<DashboardlayoutProps> = ({ children }) => {
  const router = useRouter();
  const pageTitle = router.asPath.split("/")[1]?.split("?")[0];
  const pageSubTitle = router.asPath.split("/")[2]?.split("?")[0];
  const mobileNav = useDisclosure();

  return (
    <div className="bg-white min-h-[100dvh]">
      <aside
        className={`bg-white border-r-0.05 border-black-10 w-[21.2rem] fixed left-0 h-[100dvh]
        p-1.6 flex flex-col gap-2.4 ${
          mobileNav.isOpen ? "translate-x-0" : "-translate-x-[21.2rem]"
        } xl:translate-x-0 transition-all duration-500 ease-in-out z-1`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col gap-0.4 pb-1.2">
            <div className="flex items-center gap-0.8 p-0.8">
              {/* <Image
              src="/next.svg"
              width={24}
              height={24}
              className="rounded-full object-cover"
              alt=""
            /> */}
              <span className="w-2.4 h-2.4 rounded-full object-cover bg-orange-light text-small inline-flex items-center justify-center">
                A
              </span>
              <span className="text-normal text-black">Asd</span>
            </div>

            <div className="h-0.4 w-full" />
          </div>

          <Button
            size="md"
            style="borderless"
            text=""
            onClick={mobileNav.onClose}
            leftIcon={<Close />}
            className="xl:hidden px-0"
          />
        </div>

        <div className="flex flex-col gap-0.4 pb-1.2">
          <Link
            href="/"
            className={`rounded-1.2 hover:bg-black-04 focus:bg-black-04 focus:underline
            p-0.8 ${
              router.pathname === "/" ? "bg-black-04" : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-0.8">
              <span className="flex items-center justify-center min-w-2 h-2 [&>svg]:w-2 [&>svg]:h-2">
                {router.pathname === "/" ? (
                  <ChartPieSliceFilled />
                ) : (
                  <ChartPieSlice />
                )}
              </span>
              <span className="text-normal text-black">Overview</span>
            </div>
          </Link>

          <Link
            href="/members"
            className={`rounded-1.2 hover:bg-black-04 focus:bg-black-04 focus:underline
            p-0.8 ${
              router.pathname.includes("/members")
                ? "bg-black-04"
                : "bg-transparent"
            }`}
          >
            <div className="flex items-center gap-0.8">
              <span className="flex items-center justify-center min-w-2 h-2 [&>svg]:w-2 [&>svg]:h-2">
                {router.pathname.includes("/members") ? (
                  <UsersFilled />
                ) : (
                  <Users />
                )}
              </span>
              <span className="text-normal text-black">Members</span>
            </div>
          </Link>
        </div>
      </aside>

      <main className="xl:ml-[21.2rem]">
        <header className="border-b-0.05 border-black-10 py-2 pr-1.6 xl:px-2.8 flex items-center justify-between h-[6.8rem]">
          <div className="flex items-center">
            <Button
              size="md"
              style="borderless"
              text=""
              onClick={mobileNav.onOpen}
              leftIcon={<List />}
              className="xl:hidden"
            />
            <div className="flex items-center gap-0.8">
              <span className="min-w-2 h-2 [&>svg]:w-2 [&>svg]:h-2">
                <Users color="#00000066" />
              </span>

              <Link
                href={router.pathname === "/" ? "Overview" : `/${pageTitle}`}
                className={`text-normal capitalize ${
                  pageSubTitle ? "text-black-40" : "text-black"
                } py-0.4 px-0.8 hover:text-black focus:text-black focus:outline-none`}
              >
                {router.pathname === "/" ? "Overview" : pageTitle}
              </Link>

              {pageSubTitle ? (
                <>
                  <span className="text-normal text-black-20">/</span>
                  <span className="text-normal text-black capitalize py-0.4 px-0.8">
                    {pageSubTitle.split("-").join(" ")}
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-0.8">
            <Notifications />
          </div>
        </header>

        <div className="p-1.6 xl:p-2.8">{children}</div>
      </main>
    </div>
  );
};

export default DashbordLayout;
