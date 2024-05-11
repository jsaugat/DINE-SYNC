import React from "react";

function Container({ children, className }) {
  return <div className={`mt-[90.7px] mx-[2rem] ${className}`}>{children}</div>;
}

export default Container;
