import React from "react";

const H2Heading = ({ className, children }: any) => {
  return (
    <h2 className={`text-2xl text-h1-black font-semibold ${className}`}>
      {children}
    </h2>
  );
};

export default H2Heading;
