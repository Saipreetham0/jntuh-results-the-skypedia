'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams?.get('token');
      const id = searchParams?.get('id');

      if (!token || !id) {
        setStatus('error');
        setMessage('Invalid verification link. Please check your email and try again.');
        return;
      }

      try {
        const response = await fetch(
          `/api/result-alerts/verify?token=${token}&id=${encodeURIComponent(id)}`
        );
        const result = await response.json();

        if (response.ok && result.success) {
          setStatus('success');
          setMessage(result.message || 'Email verified successfully!');
          setData(result.data);
        } else if (result.expired) {
          setStatus('expired');
          setMessage(result.detail || 'Verification link has expired.');
        } else {
          setStatus('error');
          setMessage(result.detail || 'Verification failed. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Something went wrong. Please try again later.');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          {/* Status Content */}
          <div className="p-8 text-center">
            {status === 'loading' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <ArrowPathIcon className="w-10 h-10 text-[#1C61E7] animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Verifying Your Email...
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Please wait while we verify your email address.
                </p>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Success Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                  <CheckCircleIcon className="w-16 h-16 text-green-600" />
                </div>

                {/* Success Message */}
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Email Verified! 🎉
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {message}
                  </p>
                </div>

                {/* Subscription Details */}
                {data && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6 text-left">
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">
                      📋 Your Subscription Details:
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      <li className="flex items-center gap-2">
                        <span className="font-semibold">Roll Number:</span>
                        <span className="font-mono">{data.rollNumber}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold">Email:</span>
                        <span>{data.email}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold">Notify via:</span>
                        <span>{data.notifyVia?.join(', ') || 'Email'}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {/* What's Next */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span>✨</span> What happens next?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Instant Notifications:</strong> You'll receive an email as soon as results are declared
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Auto-Check:</strong> We check for new results every 15 minutes
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Stay Relaxed:</strong> No need to constantly check the JNTUH website
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Link
                    href="/"
                    className="block w-full bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Go to Homepage
                  </Link>
                  <Link
                    href="/consolidated-results"
                    className="block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    Check Results Now
                  </Link>
                </div>
              </motion.div>
            )}

            {status === 'expired' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Expired Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                  <ClockIcon className="w-10 h-10 text-yellow-600" />
                </div>

                {/* Expired Message */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Link Expired
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {message}
                  </p>
                </div>

                {/* Info Box */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-900 dark:text-yellow-100">
                    <strong>Note:</strong> Verification links expire after 24 hours for security reasons.
                  </p>
                </div>

                {/* Action Button */}
                <div className="space-y-3 pt-4">
                  <Link
                    href="/"
                    className="block w-full bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Subscribe Again
                  </Link>
                  <Link
                    href="/"
                    className="block w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 font-medium py-2 transition-all"
                  >
                    Back to Homepage
                  </Link>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Error Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <ExclamationCircleIcon className="w-10 h-10 text-red-600" />
                </div>

                {/* Error Message */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Verification Failed
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {message}
                  </p>
                </div>

                {/* Error Details */}
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-sm text-red-900 dark:text-red-100">
                    <strong>Possible reasons:</strong>
                  </p>
                  <ul className="mt-2 text-sm text-red-800 dark:text-red-200 list-disc list-inside space-y-1">
                    <li>The verification link is invalid or corrupted</li>
                    <li>Your subscription may already be verified</li>
                    <li>The link may have expired (24 hours)</li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Link
                    href="/"
                    className="block w-full bg-[#1C61E7] hover:bg-[#1C61E7]/90 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    Try Subscribing Again
                  </Link>
                  <Link
                    href="/contact"
                    className="block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    Contact Support
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Having trouble? <Link href="/contact" className="text-[#1C61E7] hover:underline">Contact us</Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-[#1C61E7] animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
