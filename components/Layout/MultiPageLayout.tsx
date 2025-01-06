import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import ListDashes from "../Shared/Icons/ListDashes";
import ChartDonut from "../Shared/Icons/ChartDonut";
import Dropdown from "../Shared/Dropdown";
import useDisclosure from "@/utils/hooks/useDisclosure";
import DropdownItem from "../Shared/Dropdown/DropdownItem";

interface MultiPageLayoutProps {
  children: ReactNode;
  links: Array<{ id: number; title: string; sub: string; link: string }>;
  subPage: string;
  pageView?: string;
  setPageView?: (view: string) => void;
}

const MultiPageLayout: FC<MultiPageLayoutProps> = ({
  children,
  links,
  subPage,
  pageView,
  setPageView,
}) => {
  const router = useRouter();
  const getSubPage = router.query?.[subPage];
  const linksDrop = useDisclosure();

  return (
    <div className="flex flex-col gap-2.8">
      <div className="flex items-center justify-between gap-2 h-3.6">
        <Dropdown
          isOpen={linksDrop.isOpen}
          onClose={linksDrop.onClose}
          onOpen={linksDrop.onOpen}
          toggle={linksDrop.toggle}
          btnText={(() => {
            return links.find((li) => router.asPath.split("?")[0] === li.link)
              ?.title as string;
          })()}
          wrapClass="lg:hidden"
        >
          {links.map((link) => (
            <DropdownItem
              value={link.title}
              onClick={() => router.push(link.link)}
            />
          ))}
        </Dropdown>
        <div className="hidden lg:flex gap-1.6 h-2.4">
          {links.map((link, idx) => {
            if (idx)
              return (
                <Link
                  key={link.id}
                  href={link.link}
                  className={`text-normal border-b-0.2 ${
                    getSubPage === link.sub
                      ? "text-black border-black"
                      : "text-black-40 border-transparent"
                  } hover:text-black focus:text-black focus:outline-none`}
                >
                  {link.title}
                </Link>
              );

            return (
              <Link
                key={link.id}
                href={link.link}
                className={`text-normal border-b-0.2 ${
                  !router.query?.[subPage]
                    ? "text-black border-black"
                    : "text-black-40 border-transparent"
                } hover:text-black focus:text-black focus:outline-none`}
              >
                {link.title}
              </Link>
            );
          })}
          {/* <Link
            href="/members/first-timers"
            className={`text-normal border-b-0.2 ${
              router.query?.subMembers === "/first-timers"
                ? "text-black border-black"
                : "text-black-40 border-transparent"
            } hover:text-black focus:text-black focus:outline-none`}
          >
            First timers
          </Link>
          <Link
            href="/members/second-timers"
            className={`text-normal border-b-0.2 ${
              router.asPath === "/members"
                ? "text-black border-black"
                : "text-black-40 border-transparent"
            } hover:text-black focus:text-black focus:outline-none`}
          >
            Second timers
          </Link> */}
        </div>

        <div className="flex items-center gap-0.8">
          <button
            type="button"
            className={`w-2.8 h-2.8 inline-flex items-center justify-center ${
              pageView === "list" ? "bg-black-04" : "bg-transparent"
            } rounded-0.8 [&>svg]:w-2 [&>svg]:h-2 hover:bg-black-04 focus:bg-black-04 focus:outline-none`}
            onClick={() => setPageView?.("list")}
          >
            <ListDashes />
          </button>
          <button
            type="button"
            className={`w-2.8 h-2.8 inline-flex items-center justify-center ${
              pageView === "analytics" ? "bg-black-04" : "bg-transparent"
            } rounded-0.8 [&>svg]:w-2 [&>svg]:h-2 hover:bg-black-04 focus:bg-black-04 focus:outline-none`}
            onClick={() => setPageView?.("analytics")}
          >
            <ChartDonut />
          </button>
        </div>
      </div>

      {children}
    </div>
  );
};

export default MultiPageLayout;
