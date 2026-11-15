"use client";

import React, { useState, useMemo } from "react";
import { Search, Building2, MapPin, Filter, ArrowUpDown } from "lucide-react";
import { InContentAd } from "@/components/adsense";
import { AD_SLOTS } from "@/config/adSlots";
import collegesRaw from "@/data/telangana_colleges.json";

interface College {
  S_no: number;
  code: string;
  Institute: string;
  Place: string;
  Dist: string;
  Region: string;
  Type: string;
  Minority: string;
  Mode: string;
}

const collegesData = collegesRaw as College[];

const JntuhTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterMode, setFilterMode] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 25;

  const filtered = useMemo(() => {
    return collegesData.filter((c) => {
      const matchSearch =
        search === "" ||
        c.Institute.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.Dist.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "ALL" || c.Type === filterType;
      const matchMode = filterMode === "ALL" || c.Mode === filterMode;

      return matchSearch && matchType && matchMode;
    });
  }, [search, filterType, filterMode]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Box */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by college name, code (e.g. 8P, CBIT)..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2.5 px-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All College Types (Govt & Private)</option>
              <option value="GOVT">Government / University</option>
              <option value="PVT">Private Affiliated</option>
            </select>
          </div>

          {/* Mode Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={filterMode}
              onChange={(e) => {
                setFilterMode(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2.5 px-3 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Genders (Co-Ed & Women)</option>
              <option value="COED">Co-Education (COED)</option>
              <option value="WOMEN">Women Only</option>
            </select>
          </div>
        </div>

        {/* Legend & Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Showing {filtered.length} of {collegesData.length} colleges
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              OU = Osmania University Region
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              COED = Co-Education
            </span>
          </div>
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setFilterType("ALL");
                setFilterMode("ALL");
                setCurrentPage(1);
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Colleges Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800 text-left text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60 font-semibold text-gray-700 dark:text-gray-300">
              <tr>
                <th className="py-3.5 pl-4 pr-3 sm:pl-6">#</th>
                <th className="px-3 py-3.5">Code</th>
                <th className="px-3 py-3.5">College Name</th>
                <th className="px-3 py-3.5">District</th>
                <th className="px-3 py-3.5">Region</th>
                <th className="px-3 py-3.5">Type</th>
                <th className="px-3 py-3.5">Gender</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-600 dark:text-gray-300">
              {paginated.length > 0 ? (
                paginated.map((item, idx) => (
                  <React.Fragment key={`${item.code}-${item.S_no}`}>
                    {idx === 12 && (
                      <tr>
                        <td colSpan={7} className="p-4 bg-gray-50/50 dark:bg-gray-800/30">
                          <InContentAd adSlot={AD_SLOTS.SPECIALIZED.TABLE_ADS} variant="in-article" />
                        </td>
                      </tr>
                    )}
                    <tr className="hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="whitespace-nowrap py-3.5 pl-4 pr-3 sm:pl-6 text-gray-400 font-mono text-xs">
                        {item.S_no}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 font-bold text-gray-900 dark:text-white font-mono">
                        <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700">
                          {item.code}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 font-medium text-gray-900 dark:text-white max-w-md">
                        {item.Institute}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5 text-gray-600 dark:text-gray-400 flex items-center gap-1.5 pt-4">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        {item.Dist}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                          {item.Region}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                            item.Type === "GOVT"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
                              : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800"
                          }`}
                        >
                          {item.Type}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold border ${
                            item.Mode === "COED"
                              ? "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                              : "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800"
                          }`}
                        >
                          {item.Mode}
                        </span>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    No colleges match your search "{search}". Try searching by code or district.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JntuhTable;
