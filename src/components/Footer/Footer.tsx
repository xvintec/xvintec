"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = () => {
    console.log(email);
  };

  const services = [
    { title: "Managed IT Services", link: "/services/managed-it-services" },
    { title: "Cloud Services", link: "/services/cloud-services" },
    {
      title: "Cybersecurity Services",
      link: "/services/cybersecurity-services",
    },
    { title: "More Service", link: "/services" },
  ];

  const company = [
    { title: "About Us", link: "/about-us" },
    { title: "Careers", link: "/careers" },
    { title: "FAQ", link: "/" },
  ];

  const more = [
    { title: "Blogs", link: "/" },
    { title: "Portfolio", link: "/" },
  ];

  return (
    <footer className="bg-navy-dark animate-fade-up animate-delay-300">
      <div className="fl-container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 mb-5">
          <div className="col-span-10 md:col-span-4 lg:col-span-6 order-last md:order-first pt-14 pb-5 md:pt-0 md:pb-0 text-center md:text-left m-auto md:m-0 grid justify-items-center md:justify-items-start">
            <div className="text-2xl font-medium max-w-[281px] leading-normal text-white">
              Sign up to our newsletter and get the latest updates
            </div>
            <div className="mt-5 flex">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-[281px] h-12 pl-5 rounded-l bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30"
              />

              <button
                className="text-white h-12 w-14 rounded-r flex justify-center items-center"
                style={{ background: "var(--primary-gradient)" }}
                onClick={handleSubmit}
              >
                <Image
                  src="/svgs/arrow-right.svg"
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          <div className="col-span-6 md:col-span-6 lg:col-span-4 grid grid-cols-6 md:grid-cols-8 lg:grid-cols-6 *:pt-5 *:md:pt-0 px-4 md:px-0">
            <div className="col-span-4 md:col-span-4 lg:col-span-3">
              <div className="text-[20px] pb-1 font-medium text-white">
                Services
              </div>
              <ul className="*:text-[16px] *:py-[6px] text-[#9AA5C0] font-light">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.link}
                      className="hover:text-white transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <div className="text-[20px] pb-1 font-medium text-white">
                Company
              </div>
              <ul className="*:text-[16px] *:py-[6px] text-[#9AA5C0] font-light">
                {company.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.link}
                      className="hover:text-white transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 md:col-span-1">
              <div className="text-[20px] pb-1 font-medium text-white">
                More
              </div>
              <ul className="*:text-[16px] *:py-[6px] text-[#9AA5C0] font-light">
                {more.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.link}
                      className="hover:text-white transition-colors"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-white/10" />

        <div className="grid grid-cols-1 md:grid-cols-2 mt-5 ">
          <div className="flex gap-5 m-auto md:m-0 pb-5 md:pb-0">
            <a
              href="https://web.facebook.com/p/Xvintec-61568106182235/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/svgs/Facebook.svg"
                alt="Facebook link"
                width={20}
                height={20}
                className="w-9 md:w-5"
              />
            </a>
            <a
              href="https://www.instagram.com/xvintec/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/svgs/Instagram.svg"
                alt="Instagram link"
                width={20}
                height={20}
                className="mt-[1px] w-9 md:w-5"
              />
            </a>
          </div>
          <div className="text-center md:text-right text-[#9AA5C0] text-[14px] font-light">
            © 2026 - Created by Xvintec
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-end">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
