"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Clock,
  Mail,
  Star,
  ListPlus,
  ExternalLink,
  Loader2,
} from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
  features?: string[];
  googleFormUrl?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We're working on something awesome!",
  features = [
    "Enhanced Grade Analytics 📊",
    "Multiple University Systems 🎓",
    "PDF Report Generation 📄",
    "Grade Prediction AI 🤖",
  ],
  googleFormUrl = "https://forms.google.com/your-form-url",
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again later.");
    }
  };

  const SubmitButton = () => (
    <Button
      type="submit"
      disabled={status === "loading"}
      className="whitespace-nowrap"
    >
      {status === "loading" ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Joining...
        </>
      ) : (
        <>
          <Mail className="w-4 h-4 mr-2" />
          Join Waitlist
        </>
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        {/* Animation Container */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-block relative">
            <Clock className="w-16 h-16 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Star className="w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
          </div>

          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Features Preview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListPlus className="w-5 h-5" />
              Upcoming Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transform transition-transform hover:scale-105"
                >
                  <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Waitlist Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Join the Waitlist</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Quick Signup</TabsTrigger>
                <TabsTrigger value="form">Feature Request</TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <div className="mt-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1"
                      />
                      <SubmitButton />
                    </div>
                    {status !== "idle" && (
                      <Alert
                        variant={status === "error" ? "destructive" : "default"}
                        className={
                          status === "success"
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : ""
                        }
                      >
                        <AlertDescription>{message}</AlertDescription>
                      </Alert>
                    )}
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="form">
                <div className="mt-4 text-center">
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    Help us build the features you need! Share your suggestions
                    and requirements.
                  </p>
                  <Button
                    onClick={() => window.open(googleFormUrl, "_blank")}
                    className="w-full sm:w-auto"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open Feature Request Form
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="text-sm text-gray-500 dark:text-gray-400 text-center">
            We'll keep you updated on our progress and notify you when we
            launch!
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
