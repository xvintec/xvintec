import React from "react";

import Image from "next/image";

import H2Heading from "@/components/Common/Headings/H2Heading";

const HowWeKnowCard = ({ image, title, content, className }: any) => {
  return (
    <div className={`max-w-md ${className}`}>
      <Image
        src={image}
        alt="Samsung"
        width={40}
        height={40}
        style={{ objectFit: "contain" }}
      />
      <H2Heading className="py-5">{title}</H2Heading>
      <p className="text-p-grey font-light">{content}</p>
    </div>
  );
};

export default HowWeKnowCard;
