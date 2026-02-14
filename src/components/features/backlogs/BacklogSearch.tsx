import React, { useState } from 'react';
import { Search, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BacklogSearchProps {
    onSearch: (rollNumber: string) => void;
    loading: boolean;
}

export function BacklogSearch({ onSearch, loading }: BacklogSearchProps) {
    const [rollNumber, setRollNumber] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState("");

    const validateRollNumber = (value: string) => {
        if (!value) return "";
        if (value.length < 10) return "Roll number must be 10 characters";
        const rollNumberRegex = /^[0-9]{2}[A-Z0-9]{2}[0-9]{1}[A-Z0-9]{2}[0-9]{2}$/;
        // Basic format check (not strict to allow for new formats, but good for feedback)
        return "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validateRollNumber(rollNumber);
        if (validationError) {
            setError(validationError);
            return;
        }
        setError("");
        onSearch(rollNumber);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
        setRollNumber(value);
        if (error) setError("");
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative z-10">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-blue-500/5 dark:shadow-black/20 p-2 border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="relative flex items-center">

                    {/* Icon Prefix */}
                    <div className="absolute left-4 text-gray-400">
                        <Search className={cn("w-5 h-5 transition-colors", isFocused ? "text-blue-600" : "text-gray-400")} />
                    </div>

                    {/* Modern Input */}
                    <Input
                        type="text"
                        value={rollNumber}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Enter Hall Ticket Number (e.g., 22J21A05XX)"
                        className="w-full h-14 pl-12 pr-40 bg-transparent border-none text-lg font-semibold tracking-wide text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus-visible:ring-0 rounded-xl"
                    />

                    {/* Action Button */}
                    <div className="absolute right-1.5 top-1.5 bottom-1.5">
                        <Button
                            type="submit"
                            disabled={loading || rollNumber.length < 10}
                            className={cn(
                                "h-full px-6 rounded-xl font-bold text-white shadow-sm transition-all duration-300",
                                loading || rollNumber.length < 10
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600"
                                    : "bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                            )}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <span className="flex items-center gap-2">
                                    Check Results <ArrowRight className="w-4 h-4" />
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Helper Text & Error */}
            <div className="flex justify-between items-center mt-3 px-2">
                <div className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    <span>Official JNTUH Server Data</span>
                </div>
                {error && (
                    <p className="text-xs font-semibold text-red-500 animate-shake">
                        {error}
                    </p>
                )}
                <div className="text-xs font-medium text-gray-400">
                    Format: <span className="text-gray-500 dark:text-gray-300 font-mono">22J21A05XX</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
}
