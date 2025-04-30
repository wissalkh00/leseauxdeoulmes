import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import HeadlineCards from "./HeadlineCards";
import WaterProducts from "./WaterProducts"; // renamed from Food.jsx
import Category from "./Category";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HeadlineCards />
      <WaterProducts />
      <Category />
    </div>
  );
}
