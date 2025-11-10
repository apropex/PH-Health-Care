"use client";

import heroImgDark from "@/assets/images/hero-dark.jpg";
import heroImgLight from "@/assets/images/hero-light.jpg";
import CustomButton from "@/components/buttons/CustomButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { BriefcaseMedical, CalendarIcon, SearchIcon, Sparkles, Star } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative overflow-hidden -mt-16">
      <Image
        src={heroImgLight}
        width={1000}
        height={0}
        alt="Hero Background Image for light mode"
        className="object-cover absolute w-full h-full dark:hidden blur-xs"
      />
      <Image
        src={heroImgDark}
        width={1000}
        height={0}
        alt="Hero Background Image for dark mode"
        className="object-cover absolute w-full h-full hidden dark:block blur-xs opacity-50"
      />
      <div className="relative container mx-auto pt-40 px-4 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-3">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="flex">
            <span className="flex items-center gap-2 mb-4 bg-primary/10 border border-primary rounded-full p-1.5 text-primary text-sm font-medium">
              <Sparkles size={16} />
              AI-Powered Healthcare
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Find Your Perfect <br className="hidden md:block" /> Doctor with{" "}
            <span className="text-primary">AI</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            Our advanced AI technology analyzes your symptoms, medical history, and
            preferences to match you with the best-fit doctors in seconds.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <CustomButton icon={SearchIcon} textClass="mt-0.5">
              Find Your Doctor
            </CustomButton>
            <CustomButton variant="outline" icon={CalendarIcon} textClass="mt-0.5">
              Book Appointment
            </CustomButton>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">50K+</h3>
              <p className="text-muted-foreground text-sm">Patients Served</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1000+</h3>
              <p className="text-muted-foreground text-sm">Expert Doctors</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="text-yellow-400 w-5 h-5" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">4.9</h3>
              <p className="text-muted-foreground text-sm ml-1">Patient Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-lg"
        >
          <Card className="shadow-[8px_8px_20px_rgba(0,0,0,0.2)] bg-background dark:bg-background/15 border backdrop-blur">
            <CardContent className="p-8 space-y-5">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                AI Doctor Finder
              </h3>
              <div className="space-y-3">
                <Label className="text-sm font-medium mb-1">
                  What are your symptoms?
                </Label>
                <Input
                  placeholder="e.g. headache, fever, cough"
                  className="w-full border border-foreground/20"
                />
              </div>
              <Button className="w-full">Get AI Recommendations</Button>
              <div className="flex items-center justify-center gap-2">
                <BriefcaseMedical size={16} className="text-primary" />
                <p className="text-xs text-center">
                  Powered by advanced AI algorithms for accurate doctor matching
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="relative h-12 md:h-20 mt-20 w-full bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
