"use client";

import { useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  IdentificationIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  // Form states
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

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

      setResendSuccess(true);
    } catch (error: any) {
      console.error('Error resending verification email:', error);
      setErrorMessage(`Failed to resend verification email: ${error.message}`);
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowResendEmail(false);
    setResendSuccess(false);

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
      const isHallTicket = /^[0-9A-Z]{10,12}$/.test(identifier);

      if (!isEmail && !isHallTicket) {
        throw new Error("Please enter a valid email address or hall ticket number");
      }

      let credentials: { email: string; password: string };

      if (isEmail) {
        credentials = { email: identifier, password };
      } else {
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

      const { data, error } = await supabase.auth.signInWithPassword(credentials);

      if (error) {
        if (error.message.includes("Email not confirmed") ||
          error.message.includes("Email verification") ||
          error.message.includes("not verified")) {
          setShowResendEmail(true);
          setResendEmail(credentials.email);
        }
        throw error;
      }

      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login Error:", error);
      setErrorMessage(error.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Temporary Notice */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mb-6 px-4">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                <strong className="font-semibold">Notice:</strong> Login functionality is temporarily disabled.
                All pages are accessible without authentication.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-2xl bg-[#1C61E7] flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <UserIcon className="h-10 w-10 text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Header */}
        <h2 className="mt-8 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p className="mt-3 text-center text-base text-gray-600 dark:text-gray-400">
          Sign in to access your JNTUH Results Portal
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-10 px-6 shadow-lg sm:rounded-2xl sm:px-12 border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Identifier Input */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Email or Hall Ticket Number
              </label>
              <div className="relative rounded-xl shadow-sm group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#1C61E7] transition-colors" aria-hidden="true" />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username email"
                  required
                  className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base"
                  placeholder="info@theskypedia.com or Hall Ticket"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Enter your email address or hall ticket number
              </p>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative rounded-xl shadow-sm group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-[#1C61E7] transition-colors" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7] bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 text-base"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#1C61E7] focus:ring-[#1C61E7] transition-colors"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2.5 block text-sm text-gray-700 dark:text-gray-300 font-medium"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-semibold text-[#1C61E7] hover:text-[#21C15E] dark:text-indigo-400 dark:hover:text-[#21C15E] transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/30 p-4 border border-red-100 dark:border-red-800/50 animate-fade-in">
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

                    {/* Resend Email Option */}
                    {showResendEmail && (
                      <div className="mt-3">
                        {resendSuccess ? (
                          <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                            <CheckCircleIcon className="h-4 w-4 mr-1.5" />
                            Verification email sent! Check your inbox.
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendEmail}
                            disabled={isResending}
                            className="inline-flex items-center text-sm px-4 py-2 border border-transparent rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-medium"
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

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex justify-center items-center px-6 py-3.5 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-[#1C61E7] hover:bg-[#1552c4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1C61E7] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon
                      className="animate-spin -ml-1 mr-2.5 h-5 w-5"
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

          {/* Divider */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In */}
            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center items-center py-3.5 px-5 rounded-xl shadow-md bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-base font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-5 w-5 mr-3"
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

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#1C61E7] hover:text-[#21C15E] dark:text-indigo-400 dark:hover:text-[#21C15E] transition-colors duration-200"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
