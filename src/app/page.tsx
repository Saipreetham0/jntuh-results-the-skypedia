"use client";;
import Hero from "../components/Hero";
import ResultsBox from "../components/results";
import HomepageBlog from "../components/blog";


import type { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <main>


      <Hero />
      {/* <Newsletter /> */}
      <ResultsBox />
      <HomepageBlog />
    </main>
  );
}
