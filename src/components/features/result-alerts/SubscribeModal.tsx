"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Sparkles, CheckCircle2, AlertCircle, Loader2, ArrowRight, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    listIds: [2]
                }),
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
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-[32px] border-none shadow-2xl overflow-hidden p-0 bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">

                {/* Visual Header */}
                <div className="relative h-48 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 overflow-hidden flex flex-col justify-end p-8">
                    {/* Background Effects */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transform-gpu" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 transform-gpu" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-4 border border-white/20 shadow-lg"
                        >
                            <Bell className="w-6 h-6 text-white" />
                        </motion.div>

                        <DialogTitle className="text-2xl font-bold text-white mb-2 leading-tight">
                            Instant Result Alerts
                        </DialogTitle>
                        <DialogDescription className="text-blue-100/90 text-[13px] font-medium leading-relaxed max-w-[90%]">
                            Join 10,000+ students. Get notified the second JNTUH releases results.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex flex-col items-center justify-center py-4 text-center"
                            >
                                <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-4 ring-8 ring-green-50/50 dark:ring-green-500/5">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check Your Inbox!</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[260px] leading-relaxed">
                                    We've sent a verification link to <span className="text-gray-900 dark:text-white font-semibold">{email}</span>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Roll Number</label>
                                        <div className="relative group">
                                            <Input
                                                placeholder="e.g. 21J21A0501"
                                                value={rollNumber}
                                                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                                className="h-12 pl-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold uppercase placeholder:font-medium placeholder:normal-case placeholder:text-gray-400 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all font-mono"
                                                required
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                                                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded">JNTUH</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                                        <div className="relative">
                                            <Input
                                                type="email"
                                                placeholder="you@college.edu"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="h-12 pl-11 rounded-xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all"
                                                required
                                            />
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[15px] shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin text-white/90" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Activate Alerts <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </Button>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-start gap-3 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-xl"
                                    >
                                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                        <span className="font-medium">{error}</span>
                                    </motion.div>
                                )}

                                <div className="text-center">
                                    <p className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-tight">
                                        <Sparkles className="w-3 h-3 text-amber-500" />
                                        <span>No Spam · 1-Click Unsubscribe</span>
                                    </p>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};
