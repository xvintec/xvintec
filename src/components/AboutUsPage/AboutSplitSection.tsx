"use client";

import React, { ReactNode } from "react";

import Image from "next/image";

import H1Heading from "../Common/Headings/H1Heading";
import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

interface AboutSplitSectionProps {
  title: string;
  /** 3–4 images, arranged as a staggered collage. Placeholders for now. */
  images: string[];
  imageAlt?: string;
  /** Puts the collage on the left and the copy on the right. */
  reverse?: boolean;
  className?: string;
  children: ReactNode;
}

const AboutSplitSection = ({
  title,
  images,
  imageAlt = "",
  reverse = false,
  className = "",
  children,
}: AboutSplitSectionProps) => {
  const [sectionRef, isVisible] = useIntersectionAnimation();

  // Split into two columns; the first is nudged down so the tiles stagger.
  const columns = [
    images.filter((_, i) => i % 2 === 0),
    images.filter((_, i) => i % 2 === 1),
  ];

  return (
    <div className={`fl-container ${className}`} ref={sectionRef}>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={reverse ? "lg:order-2" : ""}>
          <H1Heading className={isVisible ? "animate-fade-up" : "opacity-0"}>
            {title}
          </H1Heading>
          <div
            className={`mt-5 space-y-4 text-p-grey font-light ${isVisible ? "animate-fade-up animate-delay-300" : "opacity-0"}`}
          >
            {children}
          </div>
        </div>

        <div
          className={`grid grid-cols-2 gap-4 ${reverse ? "lg:order-1" : ""} ${isVisible ? "animate-fade animate-delay-500" : "opacity-0"}`}
        >
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={`space-y-4 ${columnIndex === 0 ? "pt-6 md:pt-10" : ""}`}
            >
              {column.map((src, i) => (
                <div
                  key={src + i}
                  className={`relative w-full overflow-hidden rounded-2xl shadow-lg ${
                    i % 2 === 0 ? "aspect-square" : "aspect-[4/5]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={imageAlt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSplitSection;
