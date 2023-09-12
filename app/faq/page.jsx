"use client";

import Head from "next/head";
import Script from "next/script";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];

export default function faqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: {
      "@type": "Question",
      name: faqs.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faqs.answer,
      },
    },
  };
  return (
    <div>
      <Head>
        <script
          id="show-banner"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              `"@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: {


              "@type": "Question",
              name: ${faqs.question},
              acceptedAnswer: {
                "@type": "Answer",
                text: ${faqs.answer},
              },
            },`
            ),
          }}
        />
      </Head>
      <main>
        <div className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
            <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-white/10">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 dark:text-white">
                Frequently asked questions
              </h2>
              <dl className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-white/10">
                {faqs.map((faq) => (
                  <Disclosure as="div" key={faq.question} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white">
                            <span className="text-base font-semibold leading-7">
                              {faq.question}
                            </span>
                            <span className="ml-6 flex h-7 items-center">
                              {open ? (
                                <PlusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              ) : (
                                <MinusSmallIcon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </dt>
                        <Disclosure.Panel as="dd" className="mt-2 pr-12">
                          <p className="text-base leading-7 text-gray-600 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
