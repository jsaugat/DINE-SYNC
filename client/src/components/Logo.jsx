import React from "react";
import { NavLink } from "react-router-dom";

function Logo({ logoStyle, DineSync, className }) {
  const scrollToTop = () => window.scroll({ top: 0, behavior: smooth });

  return (
    <NavLink to="" onClick={scrollToTop}>
      <div className={`flex items-center gap-4 cursor-pointer ${className}`}>
        {/* icon */}
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${logoStyle}`}
        >
          <path
            d="M0 0.5H5.82717C9.04542 0.5 11.6543 3.10891 11.6543 6.32717C11.6543 9.54542 9.04542 12.1543 5.82717 12.1543H0V0.5Z"
            fill="#F1F1F1"
          />
          <path
            d="M0 24.5C0 18.0635 5.21782 12.8457 11.6543 12.8457V24.5H0Z"
            fill="#F1F1F1"
          />
          <path
            d="M12.3457 18.6728C12.3457 15.4546 14.9546 12.8457 18.1729 12.8457H24V24.5H18.1729C14.9546 24.5 12.3457 21.8911 12.3457 18.6728Z"
            fill="#F1F1F1"
          />
          <path
            d="M12.3457 0.5H24C24 6.93651 18.7822 12.1543 12.3457 12.1543V0.5Z"
            fill="#F1F1F1"
          />
        </svg>
        {/* text */}
        <h2
          className={`text-3xl mix-blend-difference font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-slate-500 font-geistSans tracking-tight ${DineSync}`}
        >
          Reservation
        </h2>
      </div>
    </NavLink>
  );
}

export default Logo;
