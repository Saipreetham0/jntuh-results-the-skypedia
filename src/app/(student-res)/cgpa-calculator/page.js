"use client";
import React, { useState, useEffect  } from "react";
import axios from "axios";

export default function cgpa() {

  // const [htno, setHtno] = useState("");
  // const [warning, setWarning] = useState("");

  const submit = async () => {

    if (htno.length !== 10) {
      setWarning("The Hall Ticket Should be 10 digits");
    } else {}
  }


  const inputEvent = (event) => {
    event.target.value = event.target.value.toUpperCase();
    setHtno(event.target.value);
  }



  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="mb-2 font-bold text-3xl text-center">CGPA Calculator</h1>
      <p></p>

      {/* <form onSubmit={handleSubmit}> */}
      <div className="w-1/2 lg:w-1/6 md:1/4 mt-3">
        <div className="mt-1">
          <input
            type="text"
            name="htno"
            onChange={inputEvent}

            maxLength="10"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-center dark:bg-gray-800"
            placeholder="Roll Number"
          />
        </div>
        <button
          // type="submit"
          onClick={submit}
          className="mt-5 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>

      {/* </form> */}
    </div>
  );
}
