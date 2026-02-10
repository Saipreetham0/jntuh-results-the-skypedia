"use client";
import React, { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  IdentificationIcon,
  BuildingLibraryIcon,
  PhoneIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";

// // Initialize Supabase client - replace with your actual values
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Signup() {
  // Form fields state
  const [rollNumber, setRollNumber] = useState("");
  const [name, setName] = useState("");
  const [collegeCode, setCollegeCode] = useState("");
  // const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Verify Roll, 2: Complete Profile

  // Fetch student data from JNTUH API
  const verifyRollNumber = async () => {
    if (!rollNumber) {
      setErrorMessage("Please enter your JNTUH roll number");
      return;
    }

    setIsVerifying(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://jntuhresults.dhethi.com/api/getAllResult?rollNumber=${rollNumber}`
      );
      const data = await response.json();

      // Check if the API returned the expected data structure
      if (data && data.details && data.details.name) {
        setName(data.details.name);
        setCollegeCode(data.details.collegeCode || "");
        if (data.details.fatherName) {
          // setFatherName(data.details.fatherName);
        }
        setIsVerified(true);
        setErrorMessage("");
        setStep(2); // Move to next step
      } else {
        setErrorMessage("Roll number not found. Please check and try again.");
        setIsVerified(false);
      }
    } catch (error) {
      setErrorMessage("Failed to verify roll number. Please try again later.");
      console.error("API Error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!isVerified) {
      setErrorMessage("Please verify your roll number first");
      return;
    }

    if (!email || !mobile || !password) {
      setErrorMessage("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    // Mobile validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    // Start submission
    setIsLoading(true);
    setErrorMessage("");

    try {
      // 1. Create auth user in Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Store additional user data in profiles table
      const { error: profileError } = await supabase
        .from("student_profiles")
        .insert([
          {
            user_id: authData.user.id,
            roll_number: rollNumber,
            full_name: name,
            college_code: collegeCode,
            // father_name: fatherName,
            mobile: mobile,
            email: email,
          },
        ]);

      if (profileError) throw profileError;

      // Success!
      setSignupSuccess(true);

      // Reset form (optional)
      setRollNumber("");
      setName("");
      setCollegeCode("");
      // setFatherName("");
      setEmail("");
      setMobile("");
      setPassword("");
      setConfirmPassword("");
      setIsVerified(false);
      setStep(1);
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage(
        error.message || "Failed to create account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to roll number verification
  const handleBack = () => {
    setStep(1);
    setIsVerified(false);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-indigo-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Temporary Notice */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mb-6 px-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                <strong className="font-semibold">Notice:</strong> Signup functionality is temporarily disabled.
                All pages are accessible without authentication.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
            <AcademicCapIcon
              className="h-10 w-10 text-white"
              aria-hidden="true"
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          JNTUH Student Portal
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {step === 1
            ? "Sign up with your JNTUH roll number"
            : "Complete your profile"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          {signupSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircleIcon className="h-14 w-14 text-green-600 dark:text-green-300" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
                Account created successfully!
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Please check your email to verify your account.
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <div>
              {/* Step indicators */}
              <div className="mb-8">
                <div className="flex items-center justify-center">
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full ${step === 1 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"}`}
                  >
                    1
                  </div>
                  <div
                    className={`h-1 w-16 ${step === 1 ? "bg-gray-300 dark:bg-gray-700" : "bg-indigo-600 dark:bg-indigo-500"}`}
                  ></div>
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full ${step === 2 ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"}`}
                  >
                    2
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 pl-4">
                    Verify
                  </span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 pr-4">
                    Profile
                  </span>
                </div>
              </div>

              {step === 1 ? (
                /* Step 1: Roll Number Verification */
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="rollNumber"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      JNTUH Roll Number
                    </label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IdentificationIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="rollNumber"
                          name="rollNumber"
                          type="text"
                          required
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                          placeholder="Enter your roll number (e.g., 20J25A0501)"
                          value={rollNumber}
                          onChange={(e) => {
                            setRollNumber(e.target.value.toUpperCase());
                            setIsVerified(false);
                          }}
                          disabled={isVerifying}
                        />
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Enter your JNTUH roll number to verify your student
                      identity
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                            {errorMessage}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    onClick={verifyRollNumber}
                    disabled={isVerifying || !rollNumber}
                  >
                    {isVerifying ? (
                      <>
                        <ArrowPathIcon
                          className="animate-spin -ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <ShieldCheckIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        Verify Roll Number
                      </>
                    )}
                  </button>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Already have an account?{" "}
                      <a
                        href="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
                      >
                        Sign in
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                /* Step 2: Complete Profile */
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Student Details Section */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                    <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-200 mb-3">
                      Verified Student Details
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <UserIcon className="h-5 w-5 text-indigo-500 mr-2" />
                        <div className="text-sm text-gray-900 dark:text-gray-200 font-medium">
                          {name}
                        </div>
                      </div>

                      {/* {fatherName && (
                        <div className="flex items-center">
                          <UserIcon className="h-5 w-5 text-indigo-500 mr-2" />
                          <div className="text-sm text-gray-900 dark:text-gray-200">
                            <span className="text-gray-500 dark:text-gray-400 text-xs mr-1">Father's Name:</span>
                            {fatherName}
                          </div>
                        </div>
                      )} */}

                      <div className="flex items-center">
                        <IdentificationIcon className="h-5 w-5 text-indigo-500 mr-2" />
                        <div className="text-sm text-gray-900 dark:text-gray-200">
                          <span className="text-gray-500 dark:text-gray-400 text-xs mr-1">
                            Roll Number:
                          </span>
                          {rollNumber}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <BuildingLibraryIcon className="h-5 w-5 text-indigo-500 mr-2" />
                        <div className="text-sm text-gray-900 dark:text-gray-200">
                          <span className="text-gray-500 dark:text-gray-400 text-xs mr-1">
                            College Code:
                          </span>
                          {collegeCode}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User input fields */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                        placeholder="info@theskypedia.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Mobile Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        autoComplete="tel"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
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
                        <LockClosedIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                        placeholder="Minimum 8 characters"
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {errorMessage && (
                    <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <ExclamationCircleIcon
                            className="h-5 w-5 text-red-400"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                            {errorMessage}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all duration-200 font-medium"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <ArrowPathIcon
                            className="animate-spin h-5 w-5 mr-2 inline"
                            aria-hidden="true"
                          />
                          Creating...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
