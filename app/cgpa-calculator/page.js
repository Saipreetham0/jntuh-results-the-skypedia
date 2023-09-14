"use client";
import React, { useState } from "react";
import axios from 'axios';

export default function cgpa() {
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // You can add your code here to handle the form submission, e.g., sending data to Supabase

    // Example code to send data to Supabase
    // const { data, error } = await supabase.from("your_table_name").upsert([
    //   {
    //     roll_number: e.target.rollNumber.value,
    //     // Add other form data fields here
    //   },
    // ]);

    // Handle success or error based on the response
  };
  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="mb-2 font-bold text-3xl text-center">CGPA Calculator</h1>
      <p></p>

      {/* <form onSubmit={handleSubmit}> */}
        <div className="w-1/2 lg:w-1/6 md:1/4 mt-3">
          <div className="mt-1">
            <input
              type="text"
              name="Roll number"
              id="email"
              maxLength="10"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center dark:bg-gray-800"
              placeholder="Roll Number"
            />
          </div>
          <button
            // type="submit"
            onClick={handleSubmit}
            className="mt-5 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      {/* </form> */}
    </div>
  );
}
