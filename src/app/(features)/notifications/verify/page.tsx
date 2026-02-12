"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

function NotificationVerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifySubscription = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid verification link. Missing token or email.");
        return;
      }

      try {
        const response = await fetch(
          `/api/notifications/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`
        );

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed. Please try again.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred during verification. Please try again.");
      }
    };

    verifySubscription();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8">

          {/* Loading State */}
          {status === "loading" && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950/30 rounded-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Verifying Your Email
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your subscription...
              </p>
            </div>
          )}

          {/* Success State */}
          {status === "success" && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Email Verified!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {message}
              </p>
              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                      You're all set!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      You'll receive email notifications when new JNTUH announcements are published.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="/notifications"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
              >
                View Notifications
              </Link>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Verification Failed
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {message}
              </p>
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-700 dark:text-red-300">
                  The verification link may have expired or is invalid. Please try subscribing again.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/notifications"
                  className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                >
                  Try Again
                </Link>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Go Home
                </Link>
              </div>
            </div>
          )}

        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function NotificationVerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950/30 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Loading...
          </h1>
        </div>
      </div>
    }>
      <NotificationVerifyContent />
    </Suspense>
  );
}
