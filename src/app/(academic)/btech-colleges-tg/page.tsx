import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import JntuhTable from "./clglist";

export const metadata: Metadata = generateMetadata({
  title: "Top B.Tech Colleges in Telangana 2026 | Engineering Institutes List & Codes",
  description:
    "Explore the comprehensive list of top B.Tech and engineering colleges in Telangana for 2026. View college codes, districts, affiliation, courses offered, and mode of education.",
  path: "/btech-colleges-tg",
  keywords: [
    "top btech colleges in telangana",
    "engineering colleges in telangana 2026",
    "jntuh affiliated colleges list",
    "ts eamcet engineering colleges",
    "telangana btech college codes",
  ],
});

export default function BTechCollegesPage() {
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Colleges", path: "/btech-colleges-tg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbSchema items={breadcrumbItems} />
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Top B.Tech Colleges in Telangana 2026
        </h1>
        <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
          Find accredited engineering institutes, college codes, university affiliations, and co-ed status across all districts in Telangana.
        </p>
      </header>
      <JntuhTable />
    </div>
  );
}
