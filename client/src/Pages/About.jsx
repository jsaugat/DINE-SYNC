import { Spotlight } from "@/components/ui/Spotlight";
import { Container } from "../master";
import React from "react";

function AboutPage() {
  return (
    <Container>
      <section>
        <Spotlight
          className="-z-20 -top-40 left-0 md:left-60 md:-top-20"
          fill="#008a8c"
        />
        <div className="flex justify-around items-center h-[84vh]">
          <h2 className="text-2xl">Who we are</h2>
          <h5 className="text-xl w-1/2 text-left bg-gradient-to-br bg-clip-text text-transparent from-white via-white to-white/30">
            At DineSync, we've curated a unique blend of convenience and
            culinary delight. From hassle-free table reservations to effortless
            food ordering, our app ensures you savor every moment. Discover a
            world of flavors, enjoy personalized recommendations, and relish
            exclusive deals. Join us as we synchronize your love for food with
            unparalleled ease. Elevate your dining adventures with DineSync –
            where every bite is a celebration!
          </h5>
        </div>
      </section>
    </Container>
  );
}

export default AboutPage;
