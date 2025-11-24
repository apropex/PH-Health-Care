// Refactored SchedulePageHeader with improved naming + functionality

"use client";
import CustomButton from "@/components/buttons/CustomButton";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDownIcon, Plus } from "lucide-react";
import React from "react";

const inputClass =
  "flex items-center h-9 min-w-0 rounded-md border border-gray-700/20 dark:border-input bg-input/50 dark:bg-input/10 px-3 py-1 text-sm shadow-xs transition outline-none disabled:pointer-events-none disabled:opacity-50";

export default function SchedulePageHeader() {
  const [startPickerOpen, setStartPickerOpen] = React.useState(false);
  const [endPickerOpen, setEndPickerOpen] = React.useState(false);

  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();

  const [timePeriod, setTimePeriod] = React.useState({ start: "AM", end: "PM" });

  const [startHour, setStartHour] = React.useState("10");
  const [startMinute, setStartMinute] = React.useState("00");
  const [endHour, setEndHour] = React.useState("06");
  const [endMinute, setEndMinute] = React.useState("30");

  const handleTimeInput = (
    value: number,
    unit: "hour" | "minute",
    type: "start" | "end"
  ) => {
    const boundedHour = Math.min(12, Math.max(0, value));
    const boundedMinute = Math.min(59, Math.max(0, value));

    const v = String(unit === "hour" ? boundedHour : boundedMinute).padStart(2, "0");

    if (type === "start") {
      if (unit === "hour") {
        setStartHour(v);
      } else {
        setStartMinute(v);
      }
    } else {
      if (unit === "hour") {
        setEndHour(v);
      } else {
        setEndMinute(v);
      }
    }
  };

  return (
    <ManagementPageHeader
      title="Schedule Management"
      description="Manage schedule details"
    >
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <CustomButton variant="outline" icon={Plus}>
              Create Schedule
            </CustomButton>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Schedule</DialogTitle>
            </DialogHeader>

            {/* Start Section */}
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-3">
                <Label htmlFor="schedule_start_date">Start Date</Label>

                <Popover open={startPickerOpen} onOpenChange={setStartPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="default"
                      id="schedule_start_date"
                      className={cn(inputClass, "justify-between")}
                    >
                      {startDate ? startDate.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      captionLayout="dropdown"
                      disabled={(date) => {
                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                        if (!endDate) return date < today;
                        return (
                          date < today || date > new Date(endDate.setHours(0, 0, 0, 0))
                        );
                      }}
                      onSelect={(date) => {
                        setStartDate(date);
                        setStartPickerOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Start Time */}
              <div className="grid gap-3">
                <Label htmlFor="start_time">Start Time</Label>

                <div className={cn(inputClass, "gap-x-2")}>
                  <input
                    type="number"
                    value={startHour}
                    onChange={(e) =>
                      handleTimeInput(Number(e.target.value), "hour", "start")
                    }
                    className="w-8 text-right outline-none"
                  />
                  :
                  <input
                    type="number"
                    value={startMinute}
                    onChange={(e) =>
                      handleTimeInput(Number(e.target.value), "minute", "start")
                    }
                    className="w-8 text-right outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setTimePeriod((prev) => ({
                        ...prev,
                        start: prev.start === "AM" ? "PM" : "AM",
                      }))
                    }
                  >
                    {timePeriod.start}
                  </button>
                </div>
              </div>
            </div>

            {/* End Section */}
            <div className="flex gap-4 mt-2">
              <div className="flex-1 flex flex-col gap-3">
                <Label htmlFor="schedule_end_date">End Date</Label>

                <Popover open={endPickerOpen} onOpenChange={setEndPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="default"
                      id="schedule_end_date"
                      className={cn(inputClass, "justify-between")}
                    >
                      {endDate ? endDate.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      captionLayout="dropdown"
                      disabled={(date) => {
                        const today = new Date(new Date().setHours(0, 0, 0, 0));
                        if (!startDate) return date < today;
                        return date < new Date(startDate.setHours(0, 0, 0, 0));
                      }}
                      onSelect={(date) => {
                        setEndDate(date);
                        setEndPickerOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Time */}
              <div className="grid gap-3">
                <Label htmlFor="end_time">End Time</Label>

                <div className={cn(inputClass, "gap-x-2")}>
                  <input
                    type="number"
                    value={endHour}
                    onChange={(e) =>
                      handleTimeInput(Number(e.target.value), "hour", "end")
                    }
                    className="w-8 text-right outline-none"
                  />
                  :
                  <input
                    type="number"
                    value={endMinute}
                    onChange={(e) =>
                      handleTimeInput(Number(e.target.value), "minute", "end")
                    }
                    className="w-8 text-right outline-none"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setTimePeriod((prev) => ({
                        ...prev,
                        end: prev.end === "AM" ? "PM" : "AM",
                      }))
                    }
                  >
                    {timePeriod.end}
                  </button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </ManagementPageHeader>
  );
}
