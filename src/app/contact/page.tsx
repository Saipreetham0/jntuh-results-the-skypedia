// "use client";
// import React, { useState } from "react";
// import { EnvelopeIcon } from "@heroicons/react/24/outline";

// interface FormData {
//   fullName: string;
//   email: string;
//   message: string;
// }

// const ContactForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     email: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<
//     "idle" | "success" | "error"
//   >("idle");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus("idle");

//     try {
//       const response = await fetch("/api/contact", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       setSubmitStatus("success");
//       // Clear form after successful submission
//       setFormData({
//         fullName: "",
//         email: "",
//         message: "",
//       });
//     } catch (error) {
//       setSubmitStatus("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   return (
//     <div className="bg-white dark:bg-gray-900">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
//         <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
//           <div>
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
//               Get in touch
//             </h2>
//             <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
//               We&apos;d love to hear from you! Please feel free to reach out
//               with any questions or inquiries. We&apos;ll get back to you as
//               soon as possible.
//             </p>
//             <dl className="mt-8 text-base text-gray-500 dark:text-gray-300">
//               <div className="mt-3">
//                 <dt className="sr-only">Email</dt>
//                 <dd className="flex">
//                   <EnvelopeIcon
//                     className="h-6 w-6 flex-shrink-0 text-indigo-400"
//                     aria-hidden="true"
//                   />
//                   <span className="ml-3">jntuhresults@theskypedia.com</span>
//                 </dd>
//               </div>
//             </dl>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label
//                 htmlFor="full-name"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Full name
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 id="full-name"
//                 autoComplete="name"
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Message
//               </label>
//               <textarea
//                 id="message"
//                 name="message"
//                 rows={4}
//                 required
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
//                 value={formData.message}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50"
//               >
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//             {submitStatus === "success" && (
//               <div className="text-green-600 dark:text-green-400">
//                 Thank you for your message. We&apos;ll be in touch soon!
//               </div>
//             )}
//             {submitStatus === "error" && (
//               <div className="text-red-600 dark:text-red-400">
//                 An error occurred. Please try again later.
//               </div>
//             )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;

"use client";
import React, { useState } from "react";
import { EnvelopeIcon, PaperAirplaneIcon, UserIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

interface FormData {
  fullName: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      // Clear form after successful submission
      setFormData({
        fullName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left Content Section */}
            <div className="px-8 py-12 lg:col-span-2 bg-blue-600 text-white">
              <h2 className="text-3xl font-bold tracking-tight">
                Let's connect
              </h2>
              <p className="mt-4 text-blue-100">
                We'd love to hear from you! Reach out with any questions or inquiries and we'll get back to you as soon as possible.
              </p>

              <div className="mt-12">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                    <EnvelopeIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div className="ml-4 text-base">
                    <p>jntuhresults@theskypedia.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-wider text-blue-300 font-medium">Follow us</p>
                  <div className="flex space-x-4">
                    {/* Social icons placeholders */}
                    <a href="#" className="rounded-full bg-blue-500/20 p-2 hover:bg-blue-500/30 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="rounded-full bg-blue-500/20 p-2 hover:bg-blue-500/30 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="rounded-full bg-blue-500/20 p-2 hover:bg-blue-500/30 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="px-8 py-12 lg:col-span-3">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Send us a message</h3>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="relative">
                  <label htmlFor="full-name" className="absolute -top-2 left-2 inline-block bg-white dark:bg-gray-800 px-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                    Full name
                  </label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-blue-600">
                    <span className="flex select-none items-center pl-3 text-gray-500 dark:text-gray-400 sm:text-sm">
                      <UserIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      id="full-name"
                      autoComplete="name"
                      required
                      className="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="absolute -top-2 left-2 inline-block bg-white dark:bg-gray-800 px-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                    Email
                  </label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-blue-600">
                    <span className="flex select-none items-center pl-3 text-gray-500 dark:text-gray-400 sm:text-sm">
                      <EnvelopeIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      required
                      className="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="absolute -top-2 left-2 inline-block bg-white dark:bg-gray-800 px-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                    Message
                  </label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus-within:ring-2 focus-within:ring-blue-600">
                    <span className="flex select-none items-center pl-3 text-gray-500 dark:text-gray-400 sm:text-sm">
                      <ChatBubbleOvalLeftIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="block flex-1 border-0 bg-transparent py-3 pl-2 text-gray-900 dark:text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 ease-in-out disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <PaperAirplaneIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">Thank you for your message. We'll be in touch soon!</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-red-800 dark:text-red-200">An error occurred. Please try again later.</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;