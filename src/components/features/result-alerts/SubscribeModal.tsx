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
import { Bell, Sparkles, CheckCircle2, AlertCircle, Loader2, ArrowRight, Mail, User } from "lucide-react";
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
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl">

                <VisuallyHidden.Root>
                    <DialogTitle>Subscribe for Result Alerts</DialogTitle>
                </VisuallyHidden.Root>

                {/* Header Section */}
                <div className="relative h-40 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 shadow-lg border border-white/20">
                            <Bell className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Instant Result Alerts</h2>
                        <p className="text-blue-100 text-xs mt-1 font-medium">Get notified via email the second JNTUH releases results.</p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 pt-8 bg-white dark:bg-slate-950 relative">
                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center justify-center py-6 text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center ring-8 ring-green-500/5">
                                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">You're Subscribed!</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-[200px] mx-auto">
                                        Check your inbox for a verification link sent to <span className="font-semibold text-slate-900 dark:text-white block mt-1">{email}</span>
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Roll Number</label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <Input
                                                placeholder="e.g. 22J21A0589"
                                                value={rollNumber}
                                                onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                                className="pl-10 h-11 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono uppercase font-semibold placeholder:normal-case placeholder:font-normal"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <Input
                                                type="email"
                                                placeholder="student@college.edu"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-10 h-11 bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            Activate Alerts <ArrowRight className="w-4 h-4" />
                                        </span>
                                    )}
                                </Button>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-xs font-medium text-red-500 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-100 dark:border-red-500/20 justify-center"
                                    >
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                <div className="text-center pt-2">
                                    <p className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
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
