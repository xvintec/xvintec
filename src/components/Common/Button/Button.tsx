"use client";

import React, { useState } from "react";

import { ButtonProps } from "@/types/CommonTypes";

function Button({
  children,
  bgColor = "btn-primary",
  onClick,
  className,
}: ButtonProps) {
  // const [isHovered, setIsHovered] = useState(false);
  // const [hoverColorNew, setHoverColor] = useState(`bg-[${bgColor}]`);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  //   setHoverColor(`bg-[${hoverColor}]`); // Change to the hover color
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  //   setHoverColor(`bg-[${bgColor}]`); // Change back to the original color
  // };

  return (
    <button
      className={`min-w-40  rounded-lg px-8 py-3 text-md font-medium ${bgColor ? bgColor : "btn-secondary"}  ${className}`}
      // style={{
      //   background: hoverColorNew,
      //   color: textColor,
      //   transition: "all 0.3s ease",
      // }}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
