import React from "react";

import Image from "next/image";
import Link from "next/link";

import H2Heading from "@/components/Common/Headings/H2Heading";

const OurServicesCard = ({ image, title, content, className, link }: any) => {
  return (
    <div className={`max-w-md bg-white py-8 px-6 rounded-lg ${className}`}>
      <Image
        src={image}
        alt={title}
        width={44}
        height={44}
        style={{ objectFit: "contain" }}
      />
      <H2Heading className="py-5">{title}</H2Heading>
      <p className="text-p-grey font-normal">{content}</p>

      {link && (
        <div className="pt-8">
          <Link href={link ? link : ""}>
            <div className="text-p-blue font-medium hover:underline self-center">
              Learn more
              <Image
                src="/icons/right-arrow.png"
                alt="Arrow right"
                width={12}
                height={12}
                className="inline ml-2 h-[10px] w-auto"
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default OurServicesCard;
