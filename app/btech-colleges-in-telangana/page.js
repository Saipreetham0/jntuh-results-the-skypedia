"use client";
import React from "react";
import Head from "next/head";
import JntuhTable from "./clglist"; // Adjust the path as needed

const HomePage = () => {
  return (
    <div>
      <Head>
        <title>Institute-wise Courses offered in Telangana</title>
        <meta
          name="description"
          content="Discover a comprehensive list of courses offered by various institutes in Telangana. Explore educational opportunities, programs, and specializations to plan your academic journey in the state of Telangana, India."
        />

        {/* Add more meta tags, link tags, etc. as needed */}
      </Head>
      {/* <h1>Welcome to the Product List</h1> */}

      <JntuhTable />
    </div>
  );
};

export default HomePage;
