"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 mb-10 border-b border-white/10">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logos/xvintec-logo-white.svg"
              alt="Xvintec"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex gap-3">
            <a
              href="https://web.facebook.com/p/Xvintec-61568106182235/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
            >
              <Image
                src="/svgs/Facebook.svg"
                alt="Facebook link"
                width={18}
                height={18}
              />
            </a>
            <a
              href="https://www.instagram.com/xvintec/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/10"
            >
              <Image
                src="/svgs/Instagram.svg"
                alt="Instagram link"
                width={18}
                height={18}
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-10 mb-5 gap-y-10">
          <div className="col-span-10 md:col-span-4 lg:col-span-6 order-last md:order-first text-center md:text-left m-auto md:m-0 grid justify-items-center md:justify-items-start">
            <div className="text-2xl font-medium max-w-[320px] leading-normal text-white">
              Sign up to our newsletter and get the latest updates
            </div>
            <div className="mt-5 flex w-full max-w-[360px] items-center rounded-full border border-white/15 bg-white/5 p-1.5">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent px-4 py-2 text-white placeholder:text-white/40 focus:outline-none"
              />

              <button
                className="group flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#0325E1] transition-colors hover:bg-white/90"
                onClick={handleSubmit}
              >
                Subscribe
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-45"
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
          <div className="text-center md:text-left text-[#9AA5C0] text-[14px] font-light pb-5 md:pb-0">
            © 2026 - Created by Xvintec
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 md:justify-end text-[#9AA5C0] text-[14px] font-light">
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
    </footer>
  );
};

export default Footer;
