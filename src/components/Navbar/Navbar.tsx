"use client";

import { FC, useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isServiceMobileMenuOpen, setIsServiceMobileMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(80);

  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(true);
  };

  const closeDropdown = () => {
    closeTimerRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleOpenClick = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(false);
  };

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

  useEffect(() => {
    const measure = () => setNavHeight(navRef.current?.offsetHeight ?? 80);
    measure();
    const settleTimer = setTimeout(measure, 320);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("resize", measure);
    };
  }, [scrolled]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
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

  // Header is transparent over the hero at rest; fills solid white once scrolled.
  const lightMode = !scrolled;

  return (
    <div className="relative z-40 animate-fade">
      <nav
        ref={navRef}
        className={`z-40 w-full fixed transition-all duration-300 ease-in-out ring-1 ${scrolled ? "bg-white shadow-lg ring-gray-900/5 py-3" : "bg-transparent ring-transparent py-4"}`}
      >
        <div className="fl-container flex flex-row items-center justify-between px-4 xl:px-0">
          <div className="inline-flex items-center" onClick={handleOpenClick}>
            <CompanyLogo
              imageClassName="w-auto h-7 md:h-9"
              className="mr-8"
              size={NavbarData.logo.size}
              image={{
                url: lightMode
                  ? "/logos/xvintec-logo-white.svg"
                  : NavbarData.logo.image.url,
                alt: NavbarData.logo.image.alt,
              }}
              link={NavbarData.logo.link}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <StackedMenu
              isOpen={isOpen}
              onOpen={openDropdown}
              onClose={closeDropdown}
              onLinkClick={handleOpenClick}
              lightMode={lightMode}
              navHeight={navHeight}
            />
            <Menu
              lightMode={lightMode}
              className="hidden md:flex"
              links={NavbarData?.menuItems}
              onLinkClick={handleOpenClick}
            />
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Link href={"/employer"} onClick={handleOpenClick}>
              <Button
                showArrow={false}
                bgColor={scrolled ? "btn-primary" : "btn-secondary"}
              >
                Reach out to us
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button onClick={handleMenuOpen}>
              {!isMenuOpen === true ? (
                <Image
                  src={lightMode ? "/icons/menu-white.svg" : "/icons/menu.svg"}
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
                    <Button showArrow={false}>Reach out to us</Button>
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
