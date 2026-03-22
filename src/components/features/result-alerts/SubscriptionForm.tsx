"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BellIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  ArrowRightIcon,
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
      const response = await fetch("/api/subscribe", { // Updated to use Brevo API
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          listIds: [2] // Default list ID for Brevo
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
      <section className={`relative w-full overflow-hidden bg-[#1C61E7] ${className}`}>
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/10" />
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/4 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-blue-400/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Left: Copy ──────────────────────────────────────── */}
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 bg-white/12 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-[0.12em]">
                  Live — Result Alerts
                </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.05] mb-4">
                Be the first<br className="hidden sm:block" /> to know.
              </h2>
              <p className="text-base md:text-lg text-blue-100 leading-relaxed mb-8 max-w-md">
                JNTUH servers go down the moment results drop. Skip the wait —
                get an instant email alert the second your results are published.
              </p>

              {/* Value props */}
              <ul className="space-y-3.5 mb-10">
                {[
                  "Instant alerts — delivered within seconds of release",
                  "Covers R22, R20 & R18 — all regulations tracked",
                  "No spam, ever — unsubscribe with one click",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                      <CheckCircleIcon className="w-3 h-3 text-green-300" />
                    </div>
                    <span className="text-sm text-blue-50 leading-relaxed font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Social proof */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {["A", "B", "C", "D", "E"].map((letter, i) => (
                    <div
                      key={letter}
                      className="w-9 h-9 rounded-full border-2 border-[#1C61E7] bg-white/20 flex items-center justify-center text-white font-bold text-xs"
                      style={{ zIndex: 5 - i }}
                    >
                      {letter}
                    </div>
                  ))}
                  <div
                    className="w-9 h-9 rounded-full border-2 border-[#1C61E7] bg-white/10 flex items-center justify-center text-[9px] font-black text-white"
                    style={{ zIndex: 0 }}
                  >
                    +9k
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">10,000+ students</p>
                  <p className="text-xs text-blue-200">already subscribed</p>
                </div>
              </div>
            </div>

            {/* ── Right: Form card ─────────────────────────────────── */}
            <div>
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 text-center shadow-2xl shadow-black/20"
                  >
                    <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-800 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircleIcon className="w-8 h-8 text-green-500 dark:text-green-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                      You&apos;re on the list!
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Check your inbox — we&apos;ve sent a verification link to activate your alerts.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-6 text-xs font-bold text-[#1C61E7] hover:underline underline-offset-2"
                    >
                      Subscribe another roll number
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-3xl p-7 md:p-8 shadow-2xl shadow-black/20"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500 mb-1">
                      Start for free
                    </p>
                    <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
                      Set up your result alerts
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Roll number */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em]">
                          Hall Ticket Number
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 21J21A0501"
                          value={rollNumber}
                          onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white uppercase placeholder:text-gray-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/25 focus:border-[#1C61E7]/50 transition-all"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.1em]">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1C61E7]/25 focus:border-[#1C61E7]/50 transition-all"
                          required
                        />
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-1.5 text-xs font-semibold text-red-500"
                          >
                            <ExclamationCircleIcon className="w-3.5 h-3.5 shrink-0" />
                            {error}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1C61E7] hover:bg-[#1a56d1] active:scale-[0.99] text-white font-display font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#1C61E7]/25 hover:shadow-[#1C61E7]/40 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm mt-1"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Processing…
                          </>
                        ) : (
                          <>
                            <BellIcon className="w-4 h-4" />
                            Activate Free Alerts
                            <ArrowRightIcon className="w-4 h-4 ml-0.5" />
                          </>
                        )}
                      </button>
                    </form>

                    {/* Footer note */}
                    <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
                      No spam, ever. Unsubscribe any time.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>
    );
  }

  // Full version for dedicated page
  return (
    <div className={`max-w-4xl mx-auto px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
          {/* Sidebar Area */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1C61E7] to-indigo-700 p-10 flex flex-col text-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                <BellIcon className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                Be the first to know.
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircleIcon className="w-4 h-4" /></div>
                  <p className="text-sm text-blue-50 font-medium leading-relaxed">
                    Instant alerts delivered straight to your inbox.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircleIcon className="w-4 h-4" /></div>
                  <p className="text-sm text-blue-50 font-medium leading-relaxed">
                    Avoid the rush and server downtime when results drop.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-white/20 p-1 rounded-full"><CheckCircleIcon className="w-4 h-4" /></div>
                  <p className="text-sm text-blue-50 font-medium leading-relaxed">
                    Dedicated checking every 15 mins for all regulations.
                  </p>
                </div>
              </div>

              <div className="mt-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-indigo-600 bg-gray-200 flex items-center justify-center text-[10px] text-gray-700 font-bold overflow-hidden`}>
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="avatar" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-500 flex items-center justify-center text-[8px] text-white font-bold">+10k</div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Joined the alert list</p>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-3 p-10 md:p-14 bg-white dark:bg-gray-800">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-8 border-2 border-green-500/20 shadow-xl shadow-green-500/10"
                  >
                    <CheckCircleIcon className="w-14 h-14 text-green-600" />
                  </motion.div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">You're on the list! 🎉</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-sm">
                    A confirmation email has been sent. Please click the link inside to activate your alerts.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-[#1C61E7] font-bold text-sm hover:underline"
                  >
                    Subscribe another roll number
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Configure Your Alerts</h3>
                    <p className="text-gray-500 dark:text-gray-400">Fill in your details to start receiving real-time JNTUH updates.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Roll Number</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <CheckCircleIcon className="h-5 w-5 text-gray-300 group-focus-within:text-[#1C61E7] transition-colors" />
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. 21J21A0501"
                          value={rollNumber}
                          onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                          className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl text-lg font-bold uppercase focus:ring-4 focus:ring-[#1C61E7]/10 focus:border-[#1C61E7] transition-all outline-none text-gray-900 dark:text-white shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-300 group-focus-within:text-[#1C61E7] transition-colors" />
                        </div>
                        <input
                          type="email"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl text-lg focus:ring-4 focus:ring-[#1C61E7]/10 focus:border-[#1C61E7] transition-all outline-none text-gray-900 dark:text-white shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#1C61E7] hover:bg-blue-600 active:scale-[0.98] text-white font-extrabold py-5 rounded-2xl transition-all shadow-2xl shadow-blue-500/30 disabled:opacity-50 flex items-center justify-center gap-3 text-lg group"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <>
                          <span>Activate Result Alerts</span>
                          <SparklesIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                        </>
                      )}
                    </button>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                      >
                        <div className="flex gap-3">
                          <ExclamationCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <p className="text-sm font-bold text-red-600 dark:text-red-400">{error}</p>
                        </div>
                      </motion.div>
                    )}
                  </form>

                  <div className="pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      Official JNTUH Portal Connected
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border border-white dark:border-gray-800 bg-gray-100 overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="avatar" />
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] font-bold text-gray-500">Fast growing community</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
