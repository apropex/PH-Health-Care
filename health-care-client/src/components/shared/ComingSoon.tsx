"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ComingSoon({ text }: { text?: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail("");
    }
  };

  return (
    <>
      <div
        className={cn(
          "min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden",
          "bg-linear-to-br from-slate-50 via-white to-emerald-50",
          " dark:from-sky-950 dark:via-green-950 dark:to-emerald-950"
        )}
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-lg w-full text-center space-y-8">
          {/* Logo / Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Coming Soon
            </h1>
            {text && <p className="text-xl md:text-2xl font-semibold">{text}</p>}
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-500 max-w-xl mx-auto leading-relaxed">
              We&apos;re building something amazing that will make your life easier and
              better.
              <span className="block mt-2 text-emerald-600 font-medium">
                Launching soon…
              </span>
            </p>
          </div>

          {/* CTA: Email Subscription */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 text-base border-slate-200 focus-visible:ring-emerald-500"
                />
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-12 px-6 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg transition-all duration-200"
            >
              {submitted ? "Thank you!" : "Notify Me"}
            </Button>
          </form>

          {/* Trust Badge */}
          <p className="text-xs text-slate-500 mt-8">
            We respect your privacy. No spam, ever.
          </p>

          {/* Footer */}
          <div className="pt-12 text-slate-400 text-sm">
            <p>
              © 2025 <span className="font-medium text-emerald-600">PH-Health-Care</span>.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Pulse animation keyframes */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}
