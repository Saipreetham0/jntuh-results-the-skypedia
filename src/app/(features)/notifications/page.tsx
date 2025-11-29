"use client";
import React, { useState, useEffect } from "react";
import {
  Bell,
  CalendarDays,
  ExternalLink,
  AlertCircle,
  ArrowDown,
  Search,
  RefreshCcw,
  ChevronLeft,
  ChevronRight,
  Mail,
} from "lucide-react";
import Link from "next/link";
import AdBanner from "@/components/adsense/AdBanner";

// Define the notification interface
interface Notification {
  title: string;
  releaseDate: string;
  date: string;
  link: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<
    Notification[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Email subscription states
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<"idle" | "success" | "error">("idle");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter states based on API documentation
  const [regulationFilter, setRegulationFilter] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  // Available filter options
  const regulations = ["R22", "R19", "R16", "R13", "R09"];
  const degrees = ["btech", "mtech", "mba", "mca"];
  const years = ["1", "2", "3", "4"];

  // Function to fetch notifications with all available filters
  const fetchNotifications = async (page = 1, perPage = itemsPerPage) => {
    setIsLoading(true);
    setError(null);

    try {
      // Build URL with all possible query parameters from the API docs
      let url = `https://jntuhresults.dhethi.com/api/notifications?page=${page}`;

      // Add optional filters if they're set
      if (regulationFilter) url += `&regulation=${regulationFilter}`;
      if (degreeFilter) url += `&degree=${degreeFilter}`;
      if (yearFilter) url += `&year=${yearFilter}`;
      if (titleFilter || searchTerm) {
        // Use either titleFilter or searchTerm for the API title parameter
        const titleQuery = titleFilter || searchTerm;
        url += `&title=${encodeURIComponent(titleQuery)}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch notifications: ${response.status}`);
      }

      const data = await response.json();

      // Handle API response
      if (Array.isArray(data)) {
        setNotifications(data);
        setFilteredNotifications(data);
        // If filtering is done on the server side, we should respect it
        // and not filter again on the client side
        setTotalPages(Math.max(1, Math.ceil(data.length / itemsPerPage)));
        setCurrentPage(page);
      } else {
        console.error("Unexpected API response format:", data);
        setError("Received unexpected data format from API");
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscriptionStatus("idle");
    setSubscriptionMessage("");

    try {
      const response = await fetch("/api/notifications/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubscriptionStatus("success");
      setSubscriptionMessage("Subscription successful! Please check your email to verify.");
      setEmail("");
    } catch (err) {
      setSubscriptionStatus("error");
      setSubscriptionMessage(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications(1); // Start with first page
  }, []); // Only run on mount, as we'll control page changes with button clicks

  // We don't need separate filtering based on search term anymore
  // as we're using the API's title parameter

  // Search button handler
  const handleSearch = () => {
    fetchNotifications(1); // Reset to first page and apply search/filters
  };

  // Handle sorting of notifications
  const handleSort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);

    const sorted = [...filteredNotifications].sort((a, b) => {
      const dateA = new Date(a.releaseDate).getTime();
      const dateB = new Date(b.releaseDate).getTime();
      return newOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredNotifications(sorted);
  };

  // Handle search input change - using API title filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // We'll use the search term for the API title filter
    // We don't do client-side filtering anymore since the API supports title filtering
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get current page items - No need to slice as API already returns paginated data
  const getCurrentPageItems = () => {
    return filteredNotifications;
  };

  // Pagination component
  const Pagination = () => {
    // Only display pagination if we have more than one page
    if (totalPages <= 1) return null;

    // Create page number buttons
    const pageNumbers = [];
    const displayRangeStart = Math.max(
      1,
      Math.min(currentPage - 2, totalPages - 4)
    );
    const displayRangeEnd = Math.min(totalPages, Math.max(currentPage + 2, 5));

    for (let i = displayRangeStart; i <= displayRangeEnd; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => fetchNotifications(i)} // Direct fetch from API for the page
          className={`px-4 py-2 text-sm ${
            currentPage === i
              ? "bg-indigo-600 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          } border border-gray-300 dark:border-gray-600 rounded-md mx-1`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={() => fetchNotifications(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50 dark:hover:bg-gray-700"
          } bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {displayRangeStart > 1 && (
          <>
            <button
              onClick={() => fetchNotifications(1)}
              className="px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mx-1"
            >
              1
            </button>
            {displayRangeStart > 2 && (
              <span className="mx-2 text-gray-500 dark:text-gray-400">...</span>
            )}
          </>
        )}

        {pageNumbers}

        {displayRangeEnd < totalPages && (
          <>
            {displayRangeEnd < totalPages - 1 && (
              <span className="mx-2 text-gray-500 dark:text-gray-400">...</span>
            )}
            <button
              onClick={() => fetchNotifications(totalPages)}
              className="px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md mx-1"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => fetchNotifications(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50 dark:hover:bg-gray-700"
          } bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Bell className="h-12 w-12 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            JNTUH Notifications
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Stay updated with the latest announcements and result notifications
            from JNTUH
          </p>
        </div>

        {/* Email Subscription Section */}
        <div className="mb-8 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Get Notifications via Email
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Subscribe to receive instant email alerts when new JNTUH notifications are published.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {/* Subscription Status Messages */}
              {subscriptionStatus === "success" && (
                <div className="mt-3 text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  ✓ {subscriptionMessage}
                </div>
              )}

              {subscriptionStatus === "error" && (
                <div className="mt-3 text-sm text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  ✗ {subscriptionMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="mb-6">
          <AdBanner
            adSlot="4312571525"
            adFormat="horizontal"
            fullWidthResponsive={true}
          />
        </div>

        {/* Filter Controls */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Filter Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Regulation Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Regulation
              </label>
              <select
                value={regulationFilter}
                onChange={(e) => setRegulationFilter(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">All Regulations</option>
                {regulations.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* Degree Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Degree
              </label>
              <select
                value={degreeFilter}
                onChange={(e) => setDegreeFilter(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">All Degrees</option>
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={titleFilter}
                onChange={(e) => setTitleFilter(e.target.value)}
                placeholder="Filter by title..."
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                // Reset all filters
                setRegulationFilter("");
                setDegreeFilter("");
                setYearFilter("");
                setTitleFilter("");
                setSearchTerm("");
                // Fetch with reset filters
                fetchNotifications(1);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Filters
            </button>

            <button
              onClick={handleSearch}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Search Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search notifications..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>

            <button
              onClick={handleSort}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sort by Date
              <ArrowDown
                className={`ml-2 h-4 w-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`}
              />
            </button>

            <button
              onClick={() => fetchNotifications(currentPage)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Items per page selector */}
        <div className="mb-6 flex justify-end">
          <div className="flex items-center">
            <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
              Items per page:
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                const newItemsPerPage = Number(e.target.value);
                setItemsPerPage(newItemsPerPage);
                // When changing items per page, reload first page with new limit
                // You might need to add the per_page parameter to your API call
                fetchNotifications(1);
              }}
              className="block border border-gray-300 dark:border-gray-600 rounded-md text-sm p-2  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle
                  className="h-5 w-5 text-red-400"
                  aria-hidden="true"
                />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error loading notifications
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => fetchNotifications(currentPage)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications list */}
        {!isLoading && !error && (
          <>
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <Bell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No notifications found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? "Try a different search term."
                    : "Check back later for updates."}
                </p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {getCurrentPageItems().map((notification, index) => (
                  <div
                    key={index}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h2>
                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarDays className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                          Released on {formatDate(notification.releaseDate)}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <a
                          href={notification.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Results <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination component */}
            <Pagination />
          </>
        )}

        {/* Bottom Ad Banner */}
        <div className="mt-8">
          <AdBanner
            adSlot="8113957727"
            adFormat="horizontal"
            fullWidthResponsive={true}
          />
        </div>

        {/* Additional help */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Looking for your results?{" "}
            <Link
              href="/consolidated-results"
              className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Check your consolidated results
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
