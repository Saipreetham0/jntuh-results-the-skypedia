"use client";
import React from "react";
import Head from "next/head";
import JntuhTable from "./clglist"; // Adjust the path as needed

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>
          Top Btech Colleges Telangana - Find the Best Engineering Institutes
        </title>
        <meta
          name="description"
          content="Discover the top Btech colleges in Telangana for quality education. Find the best engineering institutes in Telangana for a bright future."
        />
      </Head>
      {/* <h1>Welcome to the Product List</h1> */}

      <JntuhTable />
    </div>
  );
};

export default HomePage;
