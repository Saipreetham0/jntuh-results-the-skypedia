
// // "use client";
// // import React, { useState } from "react";
// // import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

// // export default function Login() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [rememberMe, setRememberMe] = useState(false);

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Handle form submission logic here
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="flex justify-center">
// //           <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
// //             <UserIcon className="h-8 w-8 text-white" aria-hidden="true" />
// //           </div>
// //         </div>
// //         <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
// //           Welcome back
// //         </h2>
// //         <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
// //           Sign in to your account to continue
// //         </p>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-xl sm:px-10 border border-gray-100 dark:border-gray-700">
// //           <form className="space-y-6" onSubmit={handleSubmit}>
// //             <div>
// //               <label
// //                 htmlFor="email"
// //                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
// //               >
// //                 Email address
// //               </label>
// //               <div className="mt-1 relative rounded-md shadow-sm">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //                 </div>
// //                 <input
// //                   id="email"
// //                   name="email"
// //                   type="email"
// //                   autoComplete="email"
// //                   required
// //                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
// //                   placeholder="you@example.com"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                 />
// //               </div>
// //             </div>

// //             <div>
// //               <label
// //                 htmlFor="password"
// //                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
// //               >
// //                 Password
// //               </label>
// //               <div className="mt-1 relative rounded-md shadow-sm">
// //                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                   <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
// //                 </div>
// //                 <input
// //                   id="password"
// //                   name="password"
// //                   type="password"
// //                   autoComplete="current-password"
// //                   required
// //                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
// //                   placeholder="••••••••"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex items-center justify-between">
// //               <div className="flex items-center">
// //                 <input
// //                   id="remember-me"
// //                   name="remember-me"
// //                   type="checkbox"
// //                   checked={rememberMe}
// //                   onChange={(e) => setRememberMe(e.target.checked)}
// //                   className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
// //                 />
// //                 <label
// //                   htmlFor="remember-me"
// //                   className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
// //                 >
// //                   Remember me
// //                 </label>
// //               </div>

// //               <div className="text-sm">
// //                 <a
// //                   href="#"
// //                   className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
// //                 >
// //                   Forgot password?
// //                 </a>
// //               </div>
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all duration-200 font-medium"
// //               >
// //                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
// //                   <LockClosedIcon className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
// //                 </span>
// //                 Sign in
// //               </button>
// //             </div>
// //           </form>

// //           <div className="mt-8">
// //             <div className="relative">
// //               <div className="absolute inset-0 flex items-center">
// //                 <div className="w-full border-t border-gray-300 dark:border-gray-600" />
// //               </div>
// //               <div className="relative flex justify-center text-sm">
// //                 <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
// //                   Or continue with
// //                 </span>
// //               </div>
// //             </div>

// //             <div className="mt-6">
// //               <a
// //                 href="#"
// //                 className="w-full inline-flex justify-center items-center py-3 px-4 rounded-lg shadow-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
// //               >
// //                 <svg
// //                   xmlns="http://www.w3.org/2000/svg"
// //                   viewBox="0 0 48 48"
// //                   className="h-5 w-5 mr-2"
// //                 >
// //                   <path
// //                     fill="#FFC107"
// //                     d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
// //                   />
// //                   <path
// //                     fill="#FF3D00"
// //                     d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
// //                   />
// //                   <path
// //                     fill="#4CAF50"
// //                     d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
// //                   />
// //                   <path
// //                     fill="#1976D2"
// //                     d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
// //                   />
// //                 </svg>
// //                 Sign in with Google
// //               </a>
// //             </div>
// //           </div>

// //           <div className="mt-6 text-center">
// //             <p className="text-sm text-gray-600 dark:text-gray-400">
// //               Don't have an account?{" "}
// //               <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
// //                 Sign up
// //               </a>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";
// import React, { useState } from "react";
// import {
//   EnvelopeIcon,
//   LockClosedIcon,
//   UserIcon,
//   IdentificationIcon,
//   ArrowPathIcon,
//   ExclamationCircleIcon
// } from "@heroicons/react/24/outline";
// import { supabase } from "@/lib/supabase";

// export default function Login() {
//   // Form states
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   // UI states
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [loginMethod, setLoginMethod] = useState("email"); // "email" or "hallticket"

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Form validation
//     if (!identifier || !password) {
//       setErrorMessage("Please fill in all required fields");
//       return;
//     }

//     // Email validation if login method is email
//     if (loginMethod === "email") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(identifier)) {
//         setErrorMessage("Please enter a valid email address");
//         return;
//       }
//     }

//     // Hall ticket validation (assuming hall ticket is alphanumeric and similar to roll number)
//     if (loginMethod === "hallticket") {
//       const hallTicketRegex = /^[0-9A-Z]{10,12}$/; // Adjust pattern as needed
//       if (!hallTicketRegex.test(identifier)) {
//         setErrorMessage("Please enter a valid hall ticket number");
//         return;
//       }
//     }

//     setIsLoading(true);
//     setErrorMessage("");

//     try {
//       let credentials;

//       if (loginMethod === "email") {
//         // If using email login
//         credentials = { email: identifier, password };
//       } else {
//         // If using hall ticket login, we need to first look up the associated email
//         const { data: profileData, error: profileError } = await supabase
//           .from("student_profiles")
//           .select("email")
//           .eq("roll_number", identifier)
//           .single();

//         if (profileError || !profileData) {
//           throw new Error("Hall ticket number not found. Please check and try again.");
//         }

//         credentials = { email: profileData.email, password };
//       }

//       // Now attempt to sign in with supabase
//       const { data, error } = await supabase.auth.signInWithPassword(credentials);

//       if (error) throw error;

//       // Successful login - redirect to dashboard or home page
//       window.location.href = "/dashboard";

//     } catch (error) {
//       console.error("Login Error:", error);
//       setErrorMessage(error.message || "Failed to sign in. Please check your credentials.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleLoginMethod = () => {
//     setLoginMethod(loginMethod === "email" ? "hallticket" : "email");
//     setIdentifier("");
//     setErrorMessage("");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
//             <UserIcon className="h-8 w-8 text-white" aria-hidden="true" />
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
//           Welcome back
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
//           Sign in to your JNTUH student account
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Login method toggle */}
//             <div className="flex justify-center mb-2">
//               <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 inline-flex">
//                 <button
//                   type="button"
//                   onClick={() => setLoginMethod("email")}
//                   className={`px-4 py-2 text-sm font-medium rounded-md ${
//                     loginMethod === "email"
//                       ? "bg-indigo-600 text-white shadow-sm"
//                       : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                   } transition-colors duration-200`}
//                 >
//                   Email
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setLoginMethod("hallticket")}
//                   className={`px-4 py-2 text-sm font-medium rounded-md ${
//                     loginMethod === "hallticket"
//                       ? "bg-indigo-600 text-white shadow-sm"
//                       : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//                   } transition-colors duration-200`}
//                 >
//                   Hall Ticket
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="identifier"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {loginMethod === "email" ? "Email address" : "Hall Ticket Number"}
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   {loginMethod === "email" ? (
//                     <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                   ) : (
//                     <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                   )}
//                 </div>
//                 <input
//                   id="identifier"
//                   name="identifier"
//                   type={loginMethod === "email" ? "email" : "text"}
//                   autoComplete={loginMethod === "email" ? "email" : "username"}
//                   required
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
//                   placeholder={loginMethod === "email" ? "you@example.com" : "Enter hall ticket number"}
//                   value={identifier}
//                   onChange={(e) => setIdentifier(loginMethod === "hallticket" ? e.target.value.toUpperCase() : e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 Password
//               </label>
//               <div className="mt-1 relative rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
//                 >
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a
//                   href="/forgot-password"
//                   className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             {/* Error message display */}
//             {errorMessage && (
//               <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
//                 <div className="flex">
//                   <div className="flex-shrink-0">
//                     <ExclamationCircleIcon
//                       className="h-5 w-5 text-red-400"
//                       aria-hidden="true"
//                     />
//                   </div>
//                   <div className="ml-3">
//                     <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
//                       {errorMessage}
//                     </h3>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
//               >
//                 {isLoading ? (
//                   <>
//                     <ArrowPathIcon
//                       className="animate-spin -ml-1 mr-2 h-5 w-5"
//                       aria-hidden="true"
//                     />
//                     Signing in...
//                   </>
//                 ) : (
//                   "Sign in"
//                 )}
//               </button>
//             </div>
//           </form>

//           <div className="mt-8">
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300 dark:border-gray-600" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//                   Or continue with
//                 </span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <button
//                 type="button"
//                 className="w-full inline-flex justify-center items-center py-3 px-4 rounded-lg shadow-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 48 48"
//                   className="h-5 w-5 mr-2"
//                 >
//                   <path
//                     fill="#FFC107"
//                     d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
//                   />
//                   <path
//                     fill="#FF3D00"
//                     d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
//                   />
//                   <path
//                     fill="#4CAF50"
//                     d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
//                   />
//                   <path
//                     fill="#1976D2"
//                     d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
//                   />
//                 </svg>
//                 Sign in with Google
//               </button>
//             </div>
//           </div>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Don't have an account?{" "}
//               <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
//                 Sign up
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";

export default function Login(): React.ReactElement {
  const handleResendEmail = async () => {
    if (!resendEmail) return;

    setIsResending(true);
    setResendSuccess(false);

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: resendEmail,
      });

      if (error) throw error;

      // Email sent successfully
      setResendSuccess(true);
    } catch (error: any) {
      console.error('Error resending verification email:', error);
      setErrorMessage(`Failed to resend verification email: ${error.message}`);
    } finally {
      setIsResending(false);
    }
  };
  // Form states
  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // UI states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showResendEmail, setShowResendEmail] = useState<boolean>(false);
  const [resendEmail, setResendEmail] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Reset states
    setShowResendEmail(false);
    setResendSuccess(false);
    e.preventDefault();

    // Form validation
    if (!identifier || !password) {
      setErrorMessage("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Check if the identifier is an email or a hall ticket number
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      const isHallTicket = /^[0-9A-Z]{10,12}$/.test(identifier); // Adjust pattern as needed

      if (!isEmail && !isHallTicket) {
        throw new Error("Please enter a valid email address or hall ticket number");
      }

      let credentials: { email: string; password: string };

      if (isEmail) {
        // If using email login
        credentials = { email: identifier, password };
      } else {
        // If using hall ticket login, we need to first look up the associated email
        const { data: profileData, error: profileError } = await supabase
          .from("student_profiles")
          .select("email")
          .eq("roll_number", identifier)
          .single();

        if (profileError || !profileData) {
          throw new Error("Hall ticket number not found. Please check and try again.");
        }

        credentials = { email: profileData.email, password };
      }

      // Now attempt to sign in with supabase
      const { data, error } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        // Check if the error is related to email verification
        if (error.message.includes("Email not confirmed") ||
            error.message.includes("Email verification") ||
            error.message.includes("not verified")) {
          setShowResendEmail(true);
          setResendEmail(credentials.email);
        }
        throw error;
      }

      // Successful login - redirect to dashboard or home page
      window.location.href = "/dashboard";

    } catch (error: any) {
      console.error("Login Error:", error);
      setErrorMessage(error.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <UserIcon className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Sign in to your JNTUH student account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email or Hall Ticket Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  placeholder="Email or Hall Ticket Number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter your email address or hall ticket number
              </p>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Error message display */}
            {errorMessage && (
              <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      {errorMessage}
                    </h3>

                    {/* Resend email verification option */}
                    {showResendEmail && (
                      <div className="mt-2">
                        {resendSuccess ? (
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Verification email sent successfully! Please check your inbox.
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendEmail}
                            disabled={isResending}
                            className="inline-flex items-center text-sm px-3 py-1.5 border border-transparent rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 mt-1"
                          >
                            {isResending ? (
                              <>
                                <ArrowPathIcon className="animate-spin -ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                                Sending...
                              </>
                            ) : (
                              "Resend verification email"
                            )}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon
                      className="animate-spin -ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3 px-4 rounded-lg shadow-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}