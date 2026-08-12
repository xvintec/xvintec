import React, { useCallback, useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ServicesData } from "@/data/ServicesData";

import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";
import OurServicesCard from "../HomePage/OurServices/OurServicesCard";

const OurServices = () => {
  const [sectionRef, isVisible] = useIntersectionAnimation();
  const [selectedService, setSelectedService] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [allItems, setallItems] = useState<any>(ServicesData);
  const [visibleItems, setVisibleItems] = useState<any>();
  const itemsPerPage = 6;
  const totalPages = Math.ceil(ServicesData.length / itemsPerPage);

  const setupInitialData = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredData = ServicesData.slice(startIndex, endIndex);
    setVisibleItems(filteredData);
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    setupInitialData();
  }, [setupInitialData]);

  const handlePrevious = () => {
    currentPage > 1 && setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNext = () => {
    currentPage != totalPages && setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleServiceChange = (service: any) => {
    console.log(service.id);
    console.log(visibleItems);
    setSelectedService(service.id);

    const filteredData = ServicesData.filter((data) => {
      if (service.id == 0) {
        return data;
      } else {
        return data.category == service.name;
      }
    });

    if (filteredData.length == ServicesData.length) {
      setupInitialData();
    } else {
      setVisibleItems(filteredData);
    }
  };

  const services = [
    { id: 0, name: "All" },
    { id: 1, name: "Management" },
    { id: 2, name: "Software & application" },
    { id: 3, name: "Cloud services" },
    { id: 4, name: "Network services" },
    { id: 5, name: "Regulatory services" },
    { id: 6, name: "Social media" },
  ];

  return (
    <div className={`fl-container mb-14 md:mb-14`}>
      <div ref={sectionRef}>
        <H1Heading
          className={`text-center mb-0 ${isVisible ? " animate-fade-up" : "opacity-0"}`}
        >
          Our services
        </H1Heading>
        <p
          className={`py-5 text-p-grey font-light max-w-5xl text-center m-auto ${isVisible ? " animate-fade-up animate-delay-300" : "opacity-0"}`}
        >
          We&apos;ll match you with dozens of high impact services that we
          provide!
        </p>

        <div className="flex flex-wrap justify-center py-2 mb-10">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => handleServiceChange(service)}
              className={`m-2 px-4 py-2 font-normal rounded ${selectedService == service.id ? "bg-[#0973E5] text-white" : "bg-[#F2F4FF] text-p-grey"}`}
            >
              {service.name}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 px-3 md:px-0 gap-y-5 m-auto justify-items-center`}
      >
        {visibleItems?.map((data: any, index: any) => (
          <OurServicesCard
            key={index}
            link={`/services/${data.link}`}
            image={data.icon}
            title={data.title}
            content={data.content}
            className={`${isVisible ? `animate-fade-up ${data.css}` : "opacity-0"}`}
          />
        ))}
      </div>

      {/* <Pagination className='py-10'>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#"  />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination> */}

      <Pagination className="py-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default OurServices;
