"use client";
import supabase from "../../../utils/supabase";

import { useState } from "react";
// import Alert from "../Alert";
// import * as Yup from "yup";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insert the email into your Supabase table
      const { data, error } = await supabase
        .from("newsletter") // Replace with your actual table name
        .insert([{ Email :email }]);

      if (error) {
        setMessage("Error: Unable to subscribe.");
        console.error("Supabase Error:", error);
      } else {
        setMessage("Thank you for subscribing!");
        setEmail("");
      }
    } catch (error) {
      setMessage("Error: Unable to subscribe.");
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="bg-white py-16 sm:py-24 dark:bg-gray-900">

      {/* <Alert/>c */}
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50 dark:bg-gray-800" />
          <svg
            className="absolute top-8 left-1/2 -ml-3"
            width={404}
            height={392}
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={392}
              fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
            />
          </svg>
        </div>
        <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-7xl lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0"
            >
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-indigo-500 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-indigo-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Stay Informed About JNTUH Results!
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
                  Stay informed about the latest JNTUH examination results and
                  updates. Sign up for our newsletter and be the first to know
                  when results are published.
                </p>
              </div>
              {/* <section className="py-6">
                <h2 className="text-2xl font-bold mb-4">Why Subscribe?</h2>
                <ul className="list-disc ml-6 text-lg text-gray-600 dark:text-gray-300">
                  <li className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
                    Receive instant notifications when JNTUH results are
                    released.
                  </li>
                  <li>Stay ahead of the competition with timely updates.</li>
                  <li>Get valuable insights and tips for exam preparation.</li>
                  <li>
                    Join a community of JNTUH students who care about their
                    academic success.
                  </li>
                  <li>
                    Don&ap0s;t miss out on important announcements! Subscribe
                    today and be prepared for success.
                  </li>
                </ul>
              </section> */}
              <form onSubmit={handleSubmit} className="mt-12 sm:mx-auto sm:flex sm:max-w-lg">
                <div className="min-w-0 flex-1">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full rounded-md border border-transparent px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    className="block w-full rounded-md border border-transparent bg-indigo-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                  >
                    Notify me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
