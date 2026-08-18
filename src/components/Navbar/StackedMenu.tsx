import { Fragment, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ServicesData } from "@/data/ServicesData";
import { StackedMenuProps } from "@/types/CommonTypes";

const StackedMenu = ({
  isDark,
  scrolled,
  isOpen,
  onClick,
}: StackedMenuProps) => {
  const [isHoverValue, setIsHoverValue] = useState<any>(ServicesData[0]);

  // const hoverMouse = (val: any) => {
  //     console.log(isHoverValue);
  //     setIsHoverValue([]);
  // }

  useEffect(() => {
    console.log(isHoverValue);
  }, [isHoverValue]);

  // console.log(ServicesData);

  return (
    <div className="relative mr-16">
      <div
        className="inline-flex z-10 items-center gap-x-1 text-base font-semibold leading-6 text-gray-900"
        // onClick={onClick}
        onMouseEnter={onClick}
      >
        <Link
          href={"/services"}
          className={`flex items-center gap-2 font-normal ${isDark == true ? `${scrolled || isOpen ? "text-h1-black" : "text-white"}` : "text-h1-black"} cursor-pointer transition-colors lg:hover:text-[#414141]`}
        >
          Services
          {isDark == true ? (
            scrolled || isOpen ? (
              <Image
                className="h-4 w-auto object-contain"
                src={`/svgs/vuesax-linear-arrow-down.svg`}
                width={20}
                height={20}
                alt="overview-icon"
              />
            ) : (
              <Image
                className="h-4 w-auto object-contain"
                src={`/svgs/vuesax-linear-arrow-down-white.svg`}
                width={20}
                height={20}
                alt="overview-icon"
              />
            )
          ) : (
            <Image
              className="h-4 w-auto object-contain"
              src={`/svgs/vuesax-linear-arrow-down.svg`}
              width={20}
              height={20}
              alt="overview-icon"
            />
          )}
        </Link>
      </div>

      <div>
        <div
          className={`fixed left-0 z-10 mt-5 flex w-screen max-w-max ${isOpen ? "block" : "hidden"}`}
        >
          <div className="w-screen max-w-full grid grid-cols-12 flex-auto overflow-hidden bg-[#F5FBFF] text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="col-span-9">
              <div className="mt-1 text-[#A2A2A2] text-base font-semibold pl-8 pt-8">
                ALL SERVICES
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 col-span-9">
                <div className="p-4 pb-1">
                  {ServicesData.slice(0, 5).map((item) => (
                    <div
                      key={item.title}
                      className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-white"
                      onMouseEnter={() => setIsHoverValue(item)}
                    >
                      <div>
                        <Link
                          href={"/services/" + item.link}
                          className="font-semibold text-base text-gray-900 group-hover:text-[#0325E1]"
                        >
                          {item.title}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-[#727272] max-lines">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 pb-1">
                  {ServicesData.slice(5, 10).map((item) => (
                    <div
                      key={item.title}
                      className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-white  "
                      onMouseEnter={() => setIsHoverValue(item)}
                    >
                      <div>
                        <Link
                          href={"/services/" + item.link}
                          className="font-semibold text-base text-gray-900 group-hover:text-[#0325E1]"
                        >
                          {item.title}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-[#727272] max-lines">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 pb-1">
                  {ServicesData.slice(10, 15).map((item) => (
                    <div
                      key={item.title}
                      className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-white  "
                      onMouseEnter={() => setIsHoverValue(item)}
                    >
                      <div>
                        <Link
                          href={"/services/" + item.link}
                          className="font-semibold text-base text-gray-900 group-hover:text-[#0325E1]"
                        >
                          {item.title}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-[#727272] max-lines">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Link href={"/services"}>
                <div className="relative bottom-11 right-10 text-right text-base font-semibold text-[#0325E1]">
                  View all Services
                </div>
              </Link>
            </div>
            <div className="bg-white col-span-3">
              <div className="mt-1 text-[#A2A2A2] text-base font-semibold pl-8 pt-8">
                OVERVIEW
              </div>
              <div className="p-4">
                <div className="group relative gap-x-6 rounded-lg p-4 h">
                  <div className="mt-1 flex max-w-64 h-full w-full flex-none items-center justify-center rounded-lg ">
                    <Image
                      className="h-48 w-auto object-contain"
                      src={`/services/img/banner-updated/${isHoverValue["bannerImage"]}`}
                      width={200}
                      height={200}
                      alt="overview-icon"
                    />
                  </div>
                  <div className="py-5">
                    <a
                      href="#"
                      className=" text-base font-semibold text-gray-900"
                    >
                      {isHoverValue["title"]}
                    </a>
                    <p className="pt-1 pb-5 text-[#727272]">
                      {isHoverValue["description"]}
                    </p>
                    <Link
                      href={"/services/" + isHoverValue.link}
                      className="text-base font-semibold text-[#0325E1] underline"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  {item.name}
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackedMenu;
