import React from "react";

import Image from "next/image";

import Stars from "./Stars";

type TestimonialCardProps = {
  title: string;
  position: string;
  description: string;
  image: string;
  className?: string;
  count: number;
};

const TestimonialCard = ({
  title,
  position,
  description,
  image,
  className,
  count,
}: TestimonialCardProps) => {
  return (
    <div
      className={`max-w-2xl bg-white py-8 px-6 rounded-lg min-h-[255px] md:min-h-[275px] lg:min-h-[215px] ${className}`}
    >
      <div className="flex gap-4">
        <Image
          src={image}
          alt="Testimonial"
          width={100}
          height={100}
          className="rounded-full w-[80px] h-[80px] object-cover"
        />
        <div className="">
          <div className="text-xl font-medium">{title}</div>
          <p className="text-p-grey font-light">{position}</p>
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) =>
                i < count ? (
                  <Stars key={i} fill="#ffd200" />
                ) : (
                  <Stars key={i} fill="#e1e1e1" />
                )
              )}
          </div>
        </div>
      </div>
      <div className=" text-black font-light mt-3">{description}</div>
    </div>
  );
};

export default TestimonialCard;
