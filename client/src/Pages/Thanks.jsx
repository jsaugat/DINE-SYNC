import { Container } from "@/master";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Thanks() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
  }, []);
  return (
    <Container>
      <main className="h-[82vh] flex flex-col items-center justify-center bg-black">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl my-6">Thank you for choosing us !</h1>
          <h3 className="">
            We received your order. We will reach out to you shortly.
          </h3>
          <h4 className="text-neutral-400 text-md">
            For further inquiry. Contact us at :{" "}
            <span className="text-blue-500">012387988</span>
          </h4>
        </div>
        <div className="my-6 flex gap-6 text-sm">
          <Link to={"/"} className="rounded-full border border-onyx px-3 py-2">
            Back to Home
          </Link>
          <Link
            to={"/profile/orders"}
            className="rounded-full border border-onyx px-3 py-2"
          >
            See My Orders
          </Link>
        </div>
      </main>
    </Container>
  );
}
