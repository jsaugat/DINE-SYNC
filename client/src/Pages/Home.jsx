// import { Button } from "@/shadcn/ui/button";
import { Button } from "../components/ui/moving-border";

import { Container } from "../master";
import React from "react";
import { useNavigate } from "react-router-dom";
// Aceternity
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/ui/Spotlight";
import { ArrowRight } from "lucide-react";

function HomePage() {
  const navigate = useNavigate();
  const sectionStyle = "top-[95.7px] h-[80vh] rounded-[30px]";
  // const gradientOverlay = "before:absolute before:bottom-0 before:h-[150px] before:left-0 before:w-full before:bg-gradient-to-b before:from-black/0 before:via-black/50 before:to-black"
  // const lastSectionStyle = "top-[95.7px] h-[80vh] w-full rounded-[30px]";
  return (
    <>
      <Container className="relative space-y-5 ">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="Turquoise"
        />
        <section
          className={`${sectionStyle} text-center flex justify-evenly items-center h-screen mx-auto`}
        >
          {/* Header z-10 */}
          <div className="absolute top-10 z-10 w-[56.25rem] text-7xl text-left leading-none pointer-events-none font-montreal tracking-tight bg-gradient-to-r from-white via-white to-white inline-block text-transparent bg-clip-text">
            <span>ELEVATE YOUR </span>
            <br />
            <span className="text-right w-full inline-block">
              DINING EXPERIENCE
            </span>
          </div>
          {/* Hero Image z-none */}
          <figure className="bg-hero-image z-50 h-[25rem] w-[37.5rem] mt-44 mb-16 bg-cover bg-left rounded-3xl border"></figure>
          <div className="flex flex-col gap-16">
            <p className="text-[1.2rem] max-w-[47.8rem text-left font-montreal mt-20">
              Reserve your table for an exquisite dining experience and
              <br /> explore our mouthwatering menu and order your favorite
              <br /> dishes with just a click.
            </p>
            {/* RESERVE A TABLE CTA */}
            <div
              className="group h-16 w-fit flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/booking")}
            >
              {/* //? Moving Border Button */}
              <Button
                borderRadius="10rem"
                className={
                  "text-[1.1rem] bg-transparent transition-colors ease-in-out duration-300 border-onyx/50"
                  // hover:bg-gradient-to-l hover:from-teal-950 hover:to-black
                }
                duration={"6000"}
              >
                Reserve A Table
              </Button>
              <ArrowBall
                className=""
                arrowStyles="group-hover:translate-x-14 transition-all ease-out duration-300"
              />
            </div>
          </div>
        </section>
        {/* <section
          className={`bg-zinc-900 ${sectionStyle} h-screen w-[80%] mx-auto my-96`}
        ></section> */}
      </Container>
    </>
  );
}

export default HomePage;

const ArrowBall = ({ className, arrowStyles }) => (
  <div
    className={cn(
      "rounded-full size-[3.5rem] border overflow-hidden flex items-center justify-center",
      className
    )}
  >
    <div
      className={`${arrowStyles} relative h-full w-full rounded-full flex items-center justify-end`}
    >
      <ArrowRight
        strokeWidth="1.2px"
        size={"35px"}
        className="absolute -left-14 w-[3.5rem] "
      />
      <ArrowRight
        strokeWidth="1.2px"
        size={"35px"}
        className="absolute w-[3.5rem] "
      />
    </div>
  </div>
);

// function Blob() {
//   return (
//     <svg
//       className="absolute z-[-1] -left-[35rem] "
//       width="1200"
//       height="1200"
//       viewBox="0 0 1268 938"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g filter="url(#filter0_f_32_221)">
//         <ellipse
//           cx="633.976"
//           cy="468.732"
//           rx="320.234"
//           ry="115.739"
//           transform="rotate(-16.669 633.976 468.732)"
//           fill="green"
//         />
//       </g>
//       <defs>
//         <filter
//           id="filter0_f_32_221"
//           x="0.781647"
//           y="0.145538"
//           width="1266.39"
//           height="937.173"
//           filterUnits="userSpaceOnUse"
//           color-interpolation-filters="sRGB"
//         >
//           <feFlood flood-opacity="0" result="BackgroundImageFix" />
//           <feBlend
//             mode="normal"
//             in="SourceGraphic"
//             in2="BackgroundImageFix"
//             result="shape"
//           />
//           <feGaussianBlur
//             stdDeviation="162.3"
//             result="effect1_foregroundBlur_32_221"
//           />
//         </filter>
//       </defs>
//     </svg>
//   );
// }
