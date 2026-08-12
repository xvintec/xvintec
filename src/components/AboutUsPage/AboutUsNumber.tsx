// import React from "react";

// import useIntersectionAnimation from "../Common/UseScrollAnimation/UseScrollAnimation";

// const AboutUsNumber = () => {
//   const [sectionRef, isVisible] = useIntersectionAnimation();

//   const numbers = [
//     {
//       number: "340+",
//       text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam",
//       css: "animate-fade-up animate-delay-300",
//     },
//     {
//       number: "10+",
//       text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam",
//       css: "animate-fade-up animate-delay-500",
//     },
//     {
//       number: "12K+",
//       text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam",
//       css: "animate-fade-up animate-delay-700",
//     },
//   ];

//   return (
//     <div className={`fl-container mb-20 md:mb-28`} ref={sectionRef}>
//       <div
//         className={`grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-5 px-3 md:px-0 gap-y-8 m-auto justify-items-center`}
//       >
//         {numbers.map((number, index) => (
//           <div
//             key={index}
//             className={`text-p-grey font-light ${isVisible ? number.css : "opacity-0"}`}
//           >
//             <div>{number.text}</div>
//             <div className=" text-p-black font-semibold text-6xl mt-10">
//               {number.number}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AboutUsNumber;
