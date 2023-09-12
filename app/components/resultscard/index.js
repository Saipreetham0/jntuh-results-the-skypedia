// components/Card.js

import Link from "next/link";
import Image from "next/image";

export default function Card({ title, content, url }) {
  return (
    <div className="max-w-sm mb-4 ">
      <Link
        href={url}
        className="block h-48 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
      >
        <div className="flex gap-2 mt-4 mb-4">
          {/* <Image
            className="h-10 bg-green-200 rounded-lg p-1 m-1"
            src="/next.svg"
            width={60}
            height={50}
            alt="Sai"
          ></Image> */}
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
      </Link>
    </div>
  );
}
