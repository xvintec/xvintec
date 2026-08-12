import React from "react";

type StarsProps = {
  fill?: "#e1e1e1 | #ffd200";
};

const Stars = ({ fill = "#ffd200" }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width="20"
      height="20"
      id="star"
      fill={fill}
    >
      <path d="M10 1.3l2.388 6.722H18.8l-5.232 3.948 1.871 6.928L10 14.744l-5.438 4.154 1.87-6.928-5.233-3.948h6.412L10 1.3z"></path>
    </svg>
  );
};

export default Stars;
