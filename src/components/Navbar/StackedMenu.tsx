import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ServicesData } from "@/data/ServicesData";
import { StackedMenuProps } from "@/types/CommonTypes";

const StackedMenu = ({ isOpen, onClick }: StackedMenuProps) => {
  const [isHoverValue, setIsHoverValue] = useState<any>(ServicesData[0]);

  return (
    <div className="relative mr-8">
      <div
        className="inline-flex z-10 items-center gap-x-1 text-sm font-medium leading-6 text-h1-black"
        onMouseEnter={onClick}
      >
        <Link
          href={"/services"}
          className="flex items-center gap-2 text-h1-black cursor-pointer transition-colors hover:text-[#0325E1]"
        >
          Services
          <Image
            className="h-4 w-auto object-contain"
            src="/svgs/vuesax-linear-arrow-down.svg"
            width={20}
            height={20}
            alt="overview-icon"
          />
        </Link>
      </div>

      <div>
        <div
          className={`fixed left-0 z-10 mt-4 flex w-screen justify-center px-4 ${isOpen ? "block" : "hidden"}`}
        >
          <div className="w-full max-w-[1140px] grid grid-cols-12 flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-xl ring-1 ring-black/5">
            <div className="col-span-9 p-6">
              <div className="text-[#A2A2A2] text-xs font-semibold tracking-wide uppercase pl-2 pb-2">
                All Services
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 col-span-9">
                {[0, 5, 10].map((start) => (
                  <div key={start} className="p-1">
                    {ServicesData.slice(start, start + 5).map((item) => (
                      <Link
                        key={item.title}
                        href={"/services/" + item.link}
                        className="group flex items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-[#F5FBFF]"
                        onMouseEnter={() => setIsHoverValue(item)}
                      >
                        <ArrowUpRight
                          size={14}
                          className="shrink-0 text-[#A2A2A2] group-hover:text-[#0325E1] transition-colors"
                        />
                        <span className="font-medium text-h1-black group-hover:text-[#0325E1] transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <Link href={"/services"}>
                <div className="mt-2 text-right text-sm font-semibold text-[#0325E1]">
                  View all Services
                </div>
              </Link>
            </div>
            <div className="col-span-3 bg-[#F5FBFF] p-5">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-[#0325E1] bg-white rounded-full px-2.5 py-1">
                Overview
              </span>
              <div className="mt-4 flex h-32 w-full items-center justify-center overflow-hidden rounded-xl bg-white">
                <Image
                  className="h-28 w-auto object-contain"
                  src={`/services/img/banner-updated/${isHoverValue["bannerImage"]}`}
                  width={200}
                  height={200}
                  alt="overview-icon"
                />
              </div>
              <div className="pt-4">
                <p className="text-base font-semibold text-h1-black">
                  {isHoverValue["title"]}
                </p>
                <p className="mt-1 pb-4 text-[#727272] max-lines">
                  {isHoverValue["description"]}
                </p>
                <Link
                  href={"/services/" + isHoverValue.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#0325E1]"
                >
                  Learn more
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedMenu;
