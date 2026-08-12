"use client";

import { FC, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ServicesData } from "@/data/ServicesData";
import { NavbarType } from "@/types/NavbarTypes";

import Button from "../Common/Button/Button";
import CompanyLogo from "../Common/CompanyLogo/CompanyLogo";

import Menu from "./Menu";
import StackedMenu from "./StackedMenu";

type Props = {
  NavbarData: NavbarType;
};

const Navbar: FC<Props> = ({ NavbarData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, isDarkSet] = useState(false);
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isServiceMobileMenuOpen, setIsServiceMobileMenuOpen] = useState(false);

  const handleOpenClick = () => {
    setIsOpen(false);
  };

  const handleOpenHover = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    pathname != "/services" ? isDarkSet(false) : isDarkSet(true);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);

    if (isMenuOpen == true) {
      setIsServiceMobileMenuOpen(false);
      // document.body.style.overflow = "auto";
    } else {
      // document.body.style.overflow = "hidden";
    }
  };

  const handleMobileMenu = () => {
    setIsServiceMobileMenuOpen(!isServiceMobileMenuOpen);
  };

  return (
    <div className="relative z-40 animate-fade">
      <nav
        className={`z-40 w-full fixed ${!isMenuOpen === true ? "" : "bg-white"} ${scrolled ? "bg-[#F5FBFF] py-4 ring-1 ring-gray-900/5" : `${isOpen ? "bg-[#F5FBFF] py-4" : "bg-transparent py-7"}`} transition-all duration-700 ease-in-out`}
        onClick={handleOpenClick}
      >
        <div className="fl-container flex flex-row items-center justify-between px-4 xl:px-0">
          <div className="inline-flex items-center">
            <CompanyLogo
              imageClassName="w-auto h-6 md:h-8"
              className="mr-8"
              size={NavbarData.logo.size}
              image={{
                url: isDark
                  ? `${scrolled || isOpen || isMenuOpen ? NavbarData.logo.image.url : "/logos/xvintec-logo-white.svg"}`
                  : NavbarData.logo.image.url,
                alt: NavbarData.logo.image.alt,
              }}
              link={NavbarData.logo.link}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <StackedMenu
              isDark={isDark}
              scrolled={scrolled}
              isOpen={isOpen}
              onClick={handleOpenHover}
            />
            <Menu
              isDark={isDark}
              scrolled={scrolled}
              isOpen={isOpen}
              className="hidden md:flex"
              links={NavbarData?.menuItems}
              onLinkClick={handleOpenClick}
            />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Link href={"/employer"}>
              <Button>Reach out to us</Button>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button onClick={handleMenuOpen}>
              {!isMenuOpen === true ? (
                <Image
                  src={`${isDark ? "/icons/menu-white.svg" : "/icons/menu.svg"}`}
                  width={40}
                  height={40}
                  alt="hamburger-icon"
                  className=""
                />
              ) : (
                <Image
                  src="/icons/close.svg"
                  width={40}
                  height={40}
                  alt="close-icon"
                />
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <>
            <div className="bg-white absolute block w-full shadow-lg md:hidden h-[100vh]">
              <div className="flex flex-col gap-y-0 pt-6 animate-fade cursor-pointer">
                <div className={`font-light  border-[#CDD9E0] border-b-[1px]`}>
                  <div
                    className={`flex items-center gap-2 justify-between py-4 px-6  ${isServiceMobileMenuOpen ? "font-bold" : "font-base"}`}
                    onClick={handleMobileMenu}
                  >
                    Services
                    {isServiceMobileMenuOpen ? (
                      <Image
                        className="h-4 w-auto object-contain"
                        src={`/svgs/vuesax-linear-arrow-up.svg`}
                        width={20}
                        height={20}
                        alt="overview-icon"
                      />
                    ) : (
                      <Image
                        className="h-4 w-auto object-contain"
                        src={`/svgs/vuesax-linear-arrow-down.svg`}
                        width={20}
                        height={20}
                        alt="overview-icon"
                      />
                    )}
                  </div>
                  <ul
                    className={`overflow-y-auto h-[70vh] pt-1 ${isServiceMobileMenuOpen ? "block" : "hidden"} `}
                  >
                    {ServicesData.map((item) => (
                      <div
                        key={item.title}
                        className="group relative flex gap-x-6 px-6 rounded-lg py-4 hover:bg-gray-50"
                        onClick={handleMenuOpen}
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
                  </ul>
                </div>
              </div>

              <Menu
                scrolled={scrolled}
                isOpen={isOpen}
                isServiceMobileMenuOpen={isServiceMobileMenuOpen}
                className="flex flex-col gap-y-0 animate-fade"
                linkClassNames="py-4 px-6 hover:bg-blue-600 hover:text-white"
                links={NavbarData?.menuItems}
                onLinkClick={() => setIsMenuOpen(false)}
              />

              <div className="flex gap-2 pb-10 pl-6 pr-6 pt-4 *:w-full animate-fade">
                {!isServiceMobileMenuOpen ? (
                  <Link
                    onClick={handleMenuOpen}
                    href={"/employer"}
                    className="*:w-full"
                  >
                    <Button>Reach out to us</Button>
                  </Link>
                ) : (
                  <Link
                    onClick={handleMenuOpen}
                    href={"/services"}
                    className="*:w-full"
                  >
                    <div className="text-base font-semibold text-[#0325E1] pt-5">
                      View all Services
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </nav>
      {isMenuOpen && (
        <div
          onClick={handleMenuOpen}
          className="fixed top-20 -z-10 h-screen w-screen bg-black opacity-60 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Navbar;
