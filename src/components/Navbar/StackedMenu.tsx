import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { ServicesData } from "@/data/ServicesData";
import { StackedMenuProps } from "@/types/CommonTypes";

const StackedMenu = ({
  isOpen,
  onOpen,
  onClose,
  lightMode,
  navHeight = 80,
}: StackedMenuProps) => {
  const [isHoverValue, setIsHoverValue] = useState<any>(ServicesData[0]);

  return (
    <div className="relative mr-8" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <Link
        href={"/services"}
        className={`group relative flex items-center gap-2 text-sm font-medium cursor-pointer ${lightMode ? "text-white" : "text-h1-black"}`}
      >
        <span className="relative">
          Services
          <span
            className={`absolute -bottom-1 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full ${lightMode ? "bg-white" : "bg-[#0325E1]"}`}
          />
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Link>

      <div
        className={`fixed left-0 z-10 w-screen justify-center px-4 ${isOpen ? "flex" : "hidden"}`}
        style={{ top: navHeight }}
      >
        <div className="mt-3 w-full max-w-[1200px] grid grid-cols-12 flex-auto overflow-hidden rounded-2xl bg-white text-sm leading-6 shadow-xl ring-1 ring-black/5">
          <div className="col-span-3 p-6">
            <h3 className="text-lg font-semibold text-h1-black">Services</h3>
            <p className="mt-2 text-[#727272] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link
              href={"/services"}
              className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0325E1]"
            >
              Learn more
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <div className="col-span-6 border-x border-gray-100 p-6">
            <div className="text-[#A2A2A2] text-xs font-semibold tracking-wide uppercase pl-2 pb-2">
              All Services
            </div>
            <div className="grid grid-cols-2">
              {[0, 8].map((start) => (
                <div key={start} className="p-1">
                  {ServicesData.slice(start, start + 8).map((item) => (
                    <Link
                      key={item.title}
                      href={"/services/" + item.link}
                      className="group flex items-center gap-2 rounded-lg px-3 py-2.5 transition-shadow duration-200 hover:bg-[#F5FBFF] hover:shadow-sm"
                      onMouseEnter={() => setIsHoverValue(item)}
                    >
                      <ArrowUpRight
                        size={14}
                        className="shrink-0 text-[#A2A2A2] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0325E1]"
                      />
                      <span className="font-medium text-h1-black group-hover:text-[#0325E1] transition-colors">
                        {item.title}
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <Link
              href={"/services"}
              className="group mt-2 flex items-center justify-end gap-1 text-sm font-semibold text-[#0325E1]"
            >
              View all Services
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
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
              <p className="min-h-[3rem] text-base font-semibold text-h1-black">
                {isHoverValue["title"]}
              </p>
              <p className="mt-1 min-h-[3.6em] pb-4 text-[#727272] max-lines">
                {isHoverValue["description"]}
              </p>
              <Link
                href={"/services/" + isHoverValue.link}
                className="group inline-flex items-center gap-1 text-sm font-semibold text-[#0325E1]"
              >
                Learn more
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedMenu;
