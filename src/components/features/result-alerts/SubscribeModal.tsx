"use client";

import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Sparkles, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";
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
                // Close modal after success after a delay
                setTimeout(() => {
                    if (open) setOpen(false);
                    setSuccess(false);
                }, 5000);
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
            <DialogContent className="sm:max-w-[425px] rounded-[32px] border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden p-0 bg-white dark:bg-gray-900 border-none">
                <div className="bg-gradient-to-br from-[#1C61E7] to-blue-700 p-8 text-white relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                                <Bell className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Live Result Alerts</span>
                        </div>
                        <DialogTitle className="text-2xl font-extrabold mb-2 text-white">Never Miss a Result.</DialogTitle>
                        <DialogDescription className="text-blue-100 text-sm leading-relaxed">
                            Join 10,000+ students and get instant notifications when JNTUH results are announced.
                        </DialogDescription>
                    </div>
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-6"
                            >
                                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200 dark:border-green-800">
                                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Check Your Email!</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    We've sent a verification link. Please confirm your email to activate alerts.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Roll Number</label>
                                    <Input
                                        placeholder="E.G. 21J21A0501"
                                        value={rollNumber}
                                        onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                                        className="h-12 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 font-bold uppercase focus-visible:ring-[#1C61E7] focus-visible:ring-offset-0"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="YOUR@EMAIL.COM"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus-visible:ring-[#1C61E7] focus-visible:ring-offset-0"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 rounded-2xl bg-[#1C61E7] hover:bg-blue-600 text-white font-bold text-base shadow-xl shadow-blue-500/20 group transition-all"
                                >
                                    {loading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            <span>Get Result Alerts</span>
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                    <span>No Spam. Unsubscribe anytime.</span>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
};
