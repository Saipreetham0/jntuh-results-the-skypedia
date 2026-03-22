"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle2, AlertCircle, Loader2, ArrowRight, Mail, Hash, Zap, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export const SubscribeModal = ({ trigger }: { trigger: React.ReactNode }) => {
    const [rollNumber, setRollNumber] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

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
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.toLowerCase(), listIds: [2] }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccess(true);
                setRollNumber("");
                setEmail("");
                setTimeout(() => {
                    if (open) setOpen(false);
                    setSuccess(false);
                }, 4000);
            } else {
                setError(data.detail || "Failed to subscribe. Please try again.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[380px] p-0 overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-2xl gap-0">

                <VisuallyHidden.Root>
                    <DialogTitle>Subscribe for Result Alerts</DialogTitle>
                </VisuallyHidden.Root>

                <AnimatePresence mode="wait">
                    {success ? (
                        /* ── Success State ─────────────────────── */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center px-8 py-12 gap-4"
                        >
                            <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 border-2 border-green-100 dark:border-green-800 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                    You&apos;re on the list!
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[220px] mx-auto leading-relaxed">
                                    Check your inbox — click the verification link to activate alerts.
                                </p>
                            </div>
                            <button
                                onClick={() => { setSuccess(false); }}
                                className="text-xs font-semibold text-[#1C61E7] hover:underline underline-offset-2 mt-1"
                            >
                                Subscribe another roll number
                            </button>
                        </motion.div>
                    ) : (
                        /* ── Form State ────────────────────────── */
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Header */}
                            <div className="px-6 pt-7 pb-5 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-start gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#1C61E7] flex items-center justify-center flex-shrink-0 shadow-sm">
                                        <Bell className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                                            Instant Result Alerts
                                        </h2>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                                            Get notified the second JNTUH publishes your results — before the server crashes.
                                        </p>
                                    </div>
                                </div>

                                {/* Value props */}
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    {[
                                        { icon: Zap, text: "Instant alerts" },
                                        { icon: ShieldCheck, text: "No spam" },
                                        { icon: X, text: "1-click unsub" },
                                    ].map(({ icon: Icon, text }) => (
                                        <div key={text} className="inline-flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-full px-2.5 py-1">
                                            <Icon className="w-3 h-3 text-[#1C61E7]" />
                                            <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400">{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Form */}
                            <div className="px-6 py-5">
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    {/* Roll Number */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Hall Ticket Number
                                        </label>
                                        <div className="relative">
                                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                            <Input
                                                placeholder="e.g. 22J21A0589"
                                                value={rollNumber}
                                                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                                className="pl-9 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono uppercase font-semibold placeholder:normal-case placeholder:font-normal focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7] transition-all"
                                                required
                                                maxLength={10}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                            <Input
                                                type="email"
                                                placeholder="student@college.edu"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-9 h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-[#1C61E7]/20 focus:border-[#1C61E7] transition-all"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Error */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center gap-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-3 py-2"
                                            >
                                                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                                {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-10 bg-[#1C61E7] hover:bg-[#1552c4] text-white font-semibold rounded-xl shadow-sm active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                Activate Alerts
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </span>
                                        )}
                                    </Button>
                                </form>

                                {/* Footer */}
                                <div className="mt-4 flex items-center justify-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                        Connected to Official JNTUH Portal
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};
