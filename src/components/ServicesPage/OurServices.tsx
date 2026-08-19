import React, { useMemo, useRef, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ServicesData } from "@/data/ServicesData";

import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

import ServiceCaseCard from "./ServiceCaseCard";

const ITEMS_PER_PAGE = 6;
// Clears the fixed header when scrolling the section back into view.
const NAV_OFFSET = 112;

const categories = [
  "Management",
  "Software & application",
  "Cloud services",
  "Network services",
  "Regulatory services",
  "Social media",
];

const OurServices = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  // Counts come from the data so a filter can never advertise the wrong number.
  const filters = useMemo(
    () => [
      { label: "All services", value: null, count: ServicesData.length },
      ...categories.map((name) => ({
        label: name,
        value: name,
        count: ServicesData.filter((d: any) => d.category === name).length,
      })),
    ],
    []
  );

  const filtered = useMemo(
    () =>
      activeCategory
        ? ServicesData.filter((d: any) => d.category === activeCategory)
        : ServicesData,
    [activeCategory]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const visibleItems = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const selectCategory = (value: string | null) => {
    setActiveCategory(value);
    setCurrentPage(1);
  };

  // Paging from the control at the bottom would otherwise leave the reader below
  // the section — and a short final page pushes the next section into view.
  const goToPage = (next: number) => {
    setCurrentPage(next);

    const top = topRef.current;
    if (!top) return;

    window.scrollTo({
      top: top.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
      behavior: "smooth",
    });
  };

  return (
    <div className="fl-container mb-14 md:mb-14" ref={topRef}>
      <div ref={sectionRef}>
        <H1Heading
          className={`text-center mb-0 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          Our services
        </H1Heading>
        <p
          className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          We&apos;ll match you with dozens of high impact services that we
          provide!
        </p>

        <div className="mb-12 mt-6 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const isActive = activeCategory === filter.value;
            return (
              <button
                key={filter.label}
                type="button"
                onClick={() => selectCategory(filter.value)}
                className={`flex h-10 items-center rounded-md px-3 text-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#132128] text-white"
                    : "bg-[#F5F5F5] text-[#132128] hover:bg-[#ECECEC]"
                }`}
              >
                {filter.label}
                <span
                  className={`ml-2.5 text-sm font-medium ${isActive ? "text-white/70" : "text-[#0325E1]"}`}
                >
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((data: any, index: number) => (
          <ServiceCaseCard
            key={data.link ?? index}
            link={`/services/${data.link}`}
            bannerImage={data.bannerImage}
            category={data.category}
            title={data.title}
            content={data.content}
            className={isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="py-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(Math.max(1, page - 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => goToPage(p)}
                  isActive={p === page}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => goToPage(Math.min(totalPages, page + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default OurServices;
