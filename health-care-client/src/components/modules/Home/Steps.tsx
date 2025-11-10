import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileText,
  HeartPulse,
  Search,
  ShieldCheck,
  Video,
} from "lucide-react";
import React from "react";

const steps = [
  {
    icon: Search,
    title: "Search Doctor",
    description: "Find your doctor easily with a minimum of effort.",
  },
  {
    icon: ClipboardList,
    title: "Check Doctor Profile",
    description: "Get to know your doctor better.",
  },
  {
    icon: CalendarCheck,
    title: "Schedule Appointment",
    description: "Choose the time and date that suits you.",
  },
  {
    icon: ShieldCheck,
    title: "Get Your Solution",
    description: "Our doctors are here to help you.",
  },
  {
    icon: FileText,
    title: "Electronic prescription",
    description: "Get your prescription instantly.",
  },
  {
    icon: Video,
    title: "Instant video consultation",
    description: "Consult with your doctor from anywhere.",
  },
  {
    icon: CreditCard,
    title: "Easy payment options",
    description: "Pay with ease using various methods.",
  },
  {
    icon: HeartPulse,
    title: "Health recovery",
    description: "Start your journey to better health.",
  },
];

const StepCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => {
  const bgStyles = [
    "bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-950/75",
    "bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-950/75",
    "bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-950/75",
    "bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-950/75",
    "bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-950/75",
    "bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-950/75",
    "bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-950/75",
    "bg-cyan-50 hover:bg-cyan-100 dark:bg-cyan-950/60 dark:hover:bg-cyan-950/75",
  ];
  const textColors = [
    "text-blue-600",
    "text-emerald-600",
    "text-teal-600",
    "text-indigo-600",
    "text-purple-600",
    "text-rose-600",
    "text-amber-600",
    "text-cyan-600",
  ];

  return (
    <Card className={cn("transition-all duration-200", bgStyles[index])}>
      <CardContent className="p-4 min-h-32 flex items-center">
        <div className="flex items-center space-x-4">
          <div className={cn("p-3 rounded-full  bg-white shadow-sm", textColors[index])}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Steps() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Easy Steps to Get Your Solution
          </h2>
          <p className="text-muted-foreground mt-4">
            We provide advanced technologies and high-quality surgery facilities right
            here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
