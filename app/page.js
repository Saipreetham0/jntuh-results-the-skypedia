"use client";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "./components/newsletter";
import Hero from "./components/Hero";
import ResultsBox from "./components/results";
import HomepageBlog from "./components/blog";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Newsletter /> */}
      <ResultsBox />
      <HomepageBlog />
    </main>
  );
}
