import React from "react";
import {
  RocketLaunchIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BoltIcon,
  CheckBadgeIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "About Us | TheSkypedia",
  description: "Learn about TheSkypedia's mission to empower JNTUH students with fast, accurate results and resources.",
};

const stats = [
  { label: 'Students Helped', value: '50k+' },
  { label: 'Results Published', value: '100+' },
  { label: 'Accuracy', value: '100%' },
  { label: 'Uptime', value: '99.9%' },
];

const features = [
  {
    name: 'Lightning Fast Updates',
    description: 'We monitor official sources 24/7 to bring you results efficiently.',
    icon: BoltIcon,
  },
  {
    name: 'Accurate & Reliable',
    description: 'Data is directly sourced and verified to ensure 100% accuracy.',
    icon: CheckBadgeIcon,
  },
  {
    name: 'Student Community',
    description: 'Join thousands of students who trust us for their academic journey.',
    icon: UserGroupIcon,
  },
  {
    name: 'Comprehensive Resources',
    description: 'From results to syllabus and calculators, we have it all.',
    icon: AcademicCapIcon,
  },
];

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 overflow-hidden">
      {/* Hero Section */}
      <div className="relative isolate pt-14 dark:pt-0">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Empowering JNTUH Students
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                TheSkypedia is your one-stop destination for instant JNTUH results, accurate GPAs, and essential academic resources. We simplify the complex.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/5 p-8 sm:p-10">
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
                    {stats.map((stat) => (
                      <div key={stat.label} className="mx-auto flex max-w-xs flex-col gap-y-4">
                        <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.label}</dt>
                        <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50 rounded-3xl mb-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Our Mission</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Making Academic Life Easier
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We understand the stress of waiting for results and calculating GPAs. That's why we built TheSkypedia - to provide a seamless, stress-free experience for every JNTUH student.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default AboutPage;
