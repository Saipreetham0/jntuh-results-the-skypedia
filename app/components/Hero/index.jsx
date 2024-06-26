"use client";
import Image from "next/image";
import Link from "next/link";
import AdBanner from "../Adsense/AdBanner";

// import { Container } from "@/components/Container";
import logoLaravel from "../../images/logos/laravel.svg";
// import logoLaravel from "../../images/logos/laravel.svg";
import logoMirage from "../../images/logos/mirage.svg";
import logoStatamic from "../../images/logos/statamic.svg";
import logoStaticKit from "../../images/logos/statickit.svg";
import logoTransistor from "../../images/logos/transistor.svg";
import logoTuple from "../../images/logos/tuple.svg";

export default function Hero() {

  const handleWhatsAppContact = () => {
    // Replace 'YOUR_PHONE_NUMBER' with the phone number to contact
    window.open('https://api.whatsapp.com/send?phone=919550421866', '_blank');
  };

  const handleWebsiteVisit = () => {
    // Replace 'YOUR_WEBSITE_URL' with the actual URL of your website
    window.open('https://kspelectronics.in', '_blank');
  };
  return (
    <div className="pt-20 pb-5 text-center lg:pt-32">
      <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl dark:text-white">
        Instant Access to{" "}
        <span className="relative whitespace-nowrap text-blue-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg>
          <span className="relative">JNTUH Results</span>
        </span>{" "}
        {/* for small businesses. */}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 dark:text-slate-300">
        Get quick and easy access to your JNTUH (Jawaharlal Nehru Technological
        University Hyderabad) exam results on The Skypedia.
      </p>
      <br></br>

      <div className="banner text-center border border-gray-300  rounded-lg p-4 inline-block">
        <h1 className="text-3xl font-bold">
          Explore IoT Kit and ML Projects for College Students
        </h1>
        <p className="mt-2 text-lg">
          Unlock the world of innovation and technology!
        </p>
        <button
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleWhatsAppContact}
        >
          Contact via WhatsApp
        </button>

        <button
        className="mt-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleWebsiteVisit}

      >
        Visit Website
      </button>
        {/* <p className="mt-2">Or contact us at: 9550421866</p> */}
      </div>
      <div className="mt-10 flex justify-center gap-x-6">
        <AdBanner />

        {/* <button
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          variant="outline"
          className="bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900"
        >
          Check Now
        </button> */}

        {/* Button */}
        {/* <Link
            href="/check"
            className="cursor-pointer flex lg:shrink-0 justify-center items-center gap-2 font-semibold transition-all duration-300 rounded-full focus-visible:ring focus-visible:ring-red-800 focus-visible:ring-opacity-10 ring-red-800 focus:outline-none select-none disabled:cursor-not-allowed disabled:opacity-80 text-gray-50 dark:text-gray-900 bg-slate-900 dark:bg-slate-300  hover:bg-slate-700  active:bg-slate-800 active:text-slate-300  lg:px-7 px-6 lg:py-3 py-2 lg:text-md text-sm group relative w-1/4 lg:w-1/4"
          >
            Check Results
          </Link> */}
        {/* <Button href="/register">Get 6 months free</Button>
        <Button
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          variant="outline"
        >
          <svg
            aria-hidden="true"
            className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
          >
            <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
          </svg>
          <span className="ml-3">Watch video</span>
        </Button> */}
      </div>
      {/* <div className="mt-36 lg:mt-44">
        <p className="font-display text-base text-slate-900">
          Trusted by these six companies so far
        </p> */}
      {/* <ul
          role="list"
          className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0"
        >
          {[
            [
              { name: "Transistor", logo: logoTransistor },
              { name: "Tuple", logo: logoTuple },
              { name: "StaticKit", logo: logoStaticKit },
            ],
            [
              { name: "Mirage", logo: logoMirage },
              { name: "Laravel", logo: logoLaravel },
              { name: "Statamic", logo: logoStatamic },
            ],
          ].map((group, groupIndex) => (
            <li key={groupIndex}>
              <ul
                role="list"
                className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0"
              >
                {group.map((company) => (
                  <li key={company.name} className="flex">
                    <Image src={company.logo} alt={company.name} unoptimized />
                  </li>
                ))}
              </ul>
            </li>
          ))} */}
      {/* </ul> */}
      {/* </div> */}
    </div>
  );
}
