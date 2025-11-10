import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Baby, Bone, Brain, HeartPulse } from "lucide-react";

const specialists = [
  {
    name: "Cardiology",
    icon: HeartPulse,
    styles:
      "hover:bg-red-100 dark:hover:bg-red-500/30 hover:bg-linear-to-br from-red-800/40 to-card dark:shadow-[5px_10px_9px_rgba(255,0,0,0.1)] dark:hover:shadow-none",
    iconColor: "text-red-500",
  },
  {
    name: "Neurology",
    icon: Brain,
    styles:
      "hover:bg-blue-100 dark:hover:bg-blue-200/30 hover:bg-linear-to-br from-blue-800/40 to-card dark:shadow-[5px_10px_9px_rgba(0,0,255,0.1)] dark:hover:shadow-none",
    iconColor: "text-blue-500",
  },
  {
    name: "Orthopedic",
    icon: Bone,
    styles:
      "hover:bg-pink-100 dark:hover:bg-pink-200/30 hover:bg-linear-to-br from-pink-800/40 to-card dark:shadow-[5px_10px_9px_rgba(255,0,220,0.1)] dark:hover:shadow-none",
    iconColor: "text-pink-500",
  },
  {
    name: "Pediatric",
    icon: Baby,
    styles:
      "hover:bg-green-100 dark:hover:bg-green-200/30 hover:bg-linear-to-br from-green-800/40 to-card dark:shadow-[5px_10px_9px_rgba(0,255,0,0.1)] dark:hover:shadow-none",
    iconColor: "text-green-500",
  },
];

export default function Specialties() {
  return (
    <section className="py-24 mt-24 md:mt-20">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Specialist</h2>
            <p className="text-muted-foreground max-w-md mt-2">
              Access to medical experts across all major specialties.
            </p>
          </div>
          <a
            href="#"
            className="self-end sm:self-center text-primary font-semibold hover:underline mt-4 sm:mt-0"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialists.map((specialist) => (
            <Card
              key={specialist.name}
              className={cn(
                "text-center transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 shadow-[6px_12px_9px_rgba(0,0,0,0.3)]",
                specialist.styles
              )}
            >
              <CardContent className="p-6">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
                  )}
                >
                  <specialist.icon className={cn(specialist.iconColor)} size={32} />
                </div>
                <h3 className="text-lg font-semibold">{specialist.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
