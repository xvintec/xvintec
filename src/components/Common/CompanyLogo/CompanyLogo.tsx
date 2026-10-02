import React from "react";

import Image from "next/image";
import Link from "next/link";

import { CompanyLogoType, ImageType, LinkType } from "@/types/CommonTypes";

const CompanyLogo: React.FC<CompanyLogoType> = ({
  image,
  link,
  size,
  className,
  imageClassName,
}) => {
  return (
    <Link href={link} className={className}>
      <Image
        src={image.url}
        alt={image.alt}
        width={`${size === "large" ? "150" : "93"}`}
        height={`${size === "large" ? "50" : "24"}`}
        className={`select-none [-webkit-user-drag:none] ${imageClassName ?? ""}`}
        draggable={false}
        priority
      />
    </Link>
  );
};

export default CompanyLogo;
