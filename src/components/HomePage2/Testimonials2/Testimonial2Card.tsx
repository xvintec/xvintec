import React from "react";

import Image from "next/image";

import Stars from "@/components/HomePage/Testimonials/Stars";

interface Testimonial2CardProps {
  name: string;
  role: string;
  industry: string;
  initials: string;
  description: string;
  count: number;
  tint?: string;
  className?: string;
}

const Testimonial2Card = ({
  name,
  role,
  industry,
  description,
  count,
  tint,
  className,
}: Testimonial2CardProps) => {
  return (
    <div
      className={`w-full h-full bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className="relative h-40 w-full">
        <Image
          src="/images/bussiness-people-working-team-office.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: tint }}
        />
        <span className="absolute bottom-3 left-3 inline-block text-[11px] font-semibold uppercase tracking-wide text-white bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
          {industry}
        </span>
      </div>

      <div className="p-6">
        <div className="flex mb-3">
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
        <p className="text-p-black font-light">{description}</p>
        <hr className="my-5" />
        <div>
          <div className="font-medium">{name}</div>
          <p className="text-p-grey text-sm font-light">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial2Card;
