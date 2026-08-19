import React from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

interface ServiceCaseCardProps {
  link: string;
  bannerImage: string;
  category: string;
  title: string;
  content: string;
  className?: string;
}

const ServiceCaseCard = ({
  link,
  bannerImage,
  category,
  title,
  content,
  className,
}: ServiceCaseCardProps) => {
  return (
    <Link
      href={link}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_-20px_rgba(6,15,38,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-18px_rgba(6,15,38,0.35)] ${className}`}
    >
      {/* The service artwork is a transparent mockup built for the dark hero, so it
          keeps that gradient behind it here rather than sitting on white. */}
      <div
        className="relative h-44 w-full shrink-0"
        style={{ background: "var(--hero-gradient)" }}
      >
        <Image
          src={`/services/img/banner/${bannerImage}`}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-contain p-5"
        />
      </div>

      <div className="flex flex-1 flex-col p-[30px]">
        <span className="w-fit rounded-[25px] bg-navy px-[15px] py-2 text-sm font-medium uppercase leading-[14px] tracking-[0.7px] text-white">
          {category}
        </span>

        <h3 className="mt-5 text-xl font-semibold text-h1-black">{title}</h3>
        <p className="mt-3 max-lines text-p-grey font-normal">{content}</p>

        <div className="mt-6 flex items-center gap-2 text-base font-bold text-[#0325E1]">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[#0325E1] text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </span>
          Read more
        </div>
      </div>
    </Link>
  );
};

export default ServiceCaseCard;
