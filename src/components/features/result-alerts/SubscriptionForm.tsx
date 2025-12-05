"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BellIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface SubscriptionFormProps {
  className?: string;
  compact?: boolean;
}

export default function SubscriptionForm({
  className = "",
  compact = false,
}: SubscriptionFormProps) {
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!rollNumber || !email) {
      setError("Please enter both roll number and email");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/result-alerts/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNumber: rollNumber.toUpperCase(),
          email: email.toLowerCase(),
          notifyVia: ["email"],
          regulations: ["R22", "R20", "R18"],
          semesters: ["all"],
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setRollNumber("");
        setEmail("");
      } else {
        setError(data.detail || "Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (compact) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#1C61E7]/20 p-5 md:p-6 ${className}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 md:p-2 bg-[#1C61E7]/10 rounded-lg">
            <BellIcon className="w-7 h-7 md:w-6 md:h-6 text-[#1C61E7]" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
              Result Alerts
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
              Get instant notifications
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4"
            >
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    Check Your Email!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    We've sent a verification link. Click it to activate your
                    alerts.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Roll Number (e.g., 20J25A0201)"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 md:py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm md:text-sm font-medium uppercase focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20 dark:bg-gray-700 dark:text-white min-h-[44px]"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 md:py-2.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm md:text-sm focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20 dark:bg-gray-700 dark:text-white min-h-[44px]"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1C61E7] active:bg-[#1C61E7]/80 md:hover:bg-[#1C61E7]/90 text-white font-semibold py-3 md:py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <BellIcon className="w-4 h-4" />
                    Subscribe to Alerts
                  </>
                )}
              </button>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2"
                >
                  <ExclamationCircleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          We check for new results every 15 minutes
        </p>
      </div>
    );
  }

  // Full version for dedicated page
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1C61E7] to-[#1a56d1] p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <BellIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Result Alerts</h2>
          <p className="text-blue-100">
            Never miss a result declaration again!
          </p>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                  <CheckCircleIcon className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Check Your Email! 📧
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  We've sent a verification link to your email. Click it to
                  activate your result alerts.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                    💡 <strong>Tip:</strong> Check your spam folder if you don't
                    see the email
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="rollNumber"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    Roll Number
                  </label>
                  <input
                    type="text"
                    id="rollNumber"
                    placeholder="Enter your roll number (e.g., 20J25A0501)"
                    value={rollNumber}
                    onChange={(e) =>
                      setRollNumber(e.target.value.toUpperCase())
                    }
                    className="w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base font-medium uppercase focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base focus:border-[#1C61E7] focus:ring-2 focus:ring-[#1C61E7]/20 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <EnvelopeIcon className="w-6 h-6" />
                      Subscribe to Result Alerts
                    </>
                  )}
                </button>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3"
                  >
                    <ExclamationCircleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900 dark:text-red-100">
                        Error
                      </p>
                      <p className="text-sm text-red-700 dark:text-red-200">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 space-y-4">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>✨</span> What you'll get:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Instant email notifications</strong> when
                        results are declared
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Auto-check every 15 minutes</strong> during
                        result season
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Unsubscribe anytime</strong> with one click
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>100% Free</strong> - No hidden charges
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
