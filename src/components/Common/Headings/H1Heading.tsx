import React from "react";

const H1Heading = ({ className, children }: any) => {
  return (
    <h2
      className={`text-[27px] md:text-4xl text-h1-black font-semibold ${className}`}
    >
      {children}
    </h2>
  );
};

export default H1Heading;
