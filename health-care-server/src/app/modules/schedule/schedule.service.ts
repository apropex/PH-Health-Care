//

//* SCHEDULE SERVICES *//

import { Prisma } from "@prisma/client";
import { addHours, addMinutes, format, isBefore, parse } from "date-fns";
import { Request } from "express";
import { ApiError } from "../../../error-handler/ApiError";
import configureQuery from "../../../utils/configureQuery";
import sCode from "../../../utils/statusCode";
import { prisma } from "../../shared/prisma";
import { scheduleFilterFields } from "./schedule.constants";

interface SchedulePayload {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
}

/**
 * Combines date and time into a Date object
 * @param date - Date string in YYYY-MM-DD format
 * @param time - Time string in HH:mm format
 * @returns Date object combining date and time
 */

const combineDateTime = (date: string, time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const formattedDate = format(new Date(date), "yyyy-MM-dd");
  let dateTime = parse(formattedDate, "yyyy-MM-dd", new Date());
  dateTime = addHours(dateTime, hours);
  dateTime = addMinutes(dateTime, minutes);
  return dateTime;
};

/**
 * Generates time slots between start and end times for a given date
 * @param startDateTime - Start Date object
 * @param endDateTime - End Date object
 * @param intervalMinutes - Interval between slots in minutes
 * @returns Array of slot objects with start and end DateTimes
 */
const generateTimeSlots = (
  startDateTime: Date,
  endDateTime: Date,
  intervalMinutes: number,
): Array<{ startDateTime: Date; endDateTime: Date }> => {
  const slots: Array<{ startDateTime: Date; endDateTime: Date }> = [];
  let currentSlotStart = new Date(startDateTime);

  while (isBefore(currentSlotStart, endDateTime)) {
    const slotEnd = addMinutes(currentSlotStart, intervalMinutes);
    slots.push({
      startDateTime: new Date(currentSlotStart),
      endDateTime: slotEnd,
    });
    currentSlotStart = slotEnd;
  }

  return slots;
};

/**
 * Creates schedules for a date range and time slots
 * @param payload - Object containing startDate, endDate, startTime, endTime
 * @returns Array of created schedule records
 */
const createSchedule = async (payload: SchedulePayload) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalMinutes = 30;
  const schedules = [];

  let currentDate = new Date(startDate);
  const finalDate = new Date(endDate);

  // Validate input dates and times
  if (!startDate || !endDate || !startTime || !endTime) {
    throw new ApiError(
      sCode.BAD_REQUEST,
      "Missing required fields: startDate, endDate, startTime, or endTime",
    );
  }

  // Loop through each date in the range
  while (
    isBefore(currentDate, finalDate) ||
    currentDate.toDateString() === finalDate.toDateString()
  ) {
    const startDateTime = combineDateTime(currentDate.toISOString(), startTime);
    const endDateTime = combineDateTime(currentDate.toISOString(), endTime);

    // Generate time slots for the current date
    const timeSlots = generateTimeSlots(
      startDateTime,
      endDateTime,
      intervalMinutes,
    );

    // Process each time slot
    for (const slot of timeSlots) {
      // Check for existing schedule
      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: slot.startDateTime,
          endDateTime: slot.endDateTime,
        },
      });

      // Create new schedule if it doesn't exist
      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: {
            startDateTime: slot.startDateTime,
            endDateTime: slot.endDateTime,
          },
        });
        schedules.push(result);
      }
    }

    // Move to the next date
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllSchedule = async (req: Request) => {
  const { page, take, skip, orderBy, filters } = configureQuery(req.query, {
    filterFields: scheduleFilterFields,
  });

  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: { doctorId: req.decoded?.secondaryId ?? "" },
    select: { scheduleId: true },
  });

  const where: Prisma.ScheduleWhereInput = {};

  if (filters.startDateTime && filters.endDateTime) {
    where.AND = [
      { startDateTime: { gte: filters.startDateTime as string } },
      { endDateTime: { lte: filters.endDateTime as string } },
    ];
  }

  if (Array.isArray(doctorSchedules) && doctorSchedules.length > 0) {
    where.id = {
      notIn: doctorSchedules.map(({ scheduleId }) => scheduleId),
    };
  }

  const [schedules, total_data, filtered_data] = await Promise.all([
    prisma.schedule.findMany({ where, skip, take, orderBy }),
    prisma.schedule.count(),
    prisma.schedule.count({ where }),
  ]);

  return {
    data: schedules,
    meta: {
      total_data,
      filtered_data,
      total_page: Math.ceil(filtered_data / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};

const deleteSchedule = async (id: string) => {
  return await prisma.schedule.delete({ where: { id } });
};

//

export default {
  createSchedule,
  getAllSchedule,
  deleteSchedule,
};

/*



    

// Type definitions
interface SchedulePayload {
  startDate: string; // Format: "YYYY-MM-DD"
  endDate: string; // Format: "YYYY-MM-DD"
  startTime: string; // Format: "HH:mm"
  endTime: string; // Format: "HH:mm"
}

interface TimeSlot {
  start: string; // Format: "HH:mm"
  end: string; // Format: "HH:mm"
}

interface DailySchedule {
  date: string; // Format: "YYYY-MM-DD"
  slots: TimeSlot[];
}

// Function: Generate list of dates between startDate and endDate
const getDatesInRange = (startDate: string, endDate: string): string[] => {
  const dates: string[] = [];
  const currentDate = new Date(startDate);
  const finalDate = new Date(endDate);

  if (isNaN(currentDate.getTime()) || isNaN(finalDate.getTime())) {
    throw new Error("Invalid date format. Use YYYY-MM-DD.");
  }

  if (currentDate > finalDate) {
    throw new Error("startDate must be before or equal to endDate.");
  }

  while (currentDate <= finalDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

// Function: Generate time slots every 30 minutes
const generateTimeSlots = (startTime: string, endTime: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  // Validate time format
  if (
    isNaN(startHour) ||
    isNaN(startMinute) ||
    isNaN(endHour) ||
    isNaN(endMinute)
  ) {
    throw new Error("Invalid time format. Use HH:mm.");
  }

  const start = new Date(2025, 0, 1, startHour, startMinute);
  const end = new Date(2025, 0, 1, endHour, endMinute);

  if (start >= end) {
    throw new Error("startTime must be before endTime.");
  }

  let currentTime = start;
  while (currentTime < end) {
    const slotEnd = new Date(currentTime.getTime() + 30 * 60 * 1000); // Add 30 minutes
    if (slotEnd <= end) {
      slots.push({
        start: `${currentTime.getHours().toString().padStart(2, "0")}:${currentTime
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
        end: `${slotEnd.getHours().toString().padStart(2, "0")}:${slotEnd
          .getMinutes()
          .toString()
          .padStart(2, "0")}`,
      });
    }
    currentTime = slotEnd;
  }

  return slots;
};

// Main function: Create schedule
const createSchedulee = async (
  payload: SchedulePayload,
): Promise<DailySchedule[]> => {
  try {
    const { startDate, endDate, startTime, endTime } = payload;

    // Input validation
    if (!startDate || !endDate || !startTime || !endTime) {
      throw new Error(
        "All fields (startDate, endDate, startTime, endTime) are required.",
      );
    }

    // Generate list of dates
    const dates = getDatesInRange(startDate, endDate);

    // Generate time slots for each day
    const timeSlots = generateTimeSlots(startTime, endTime);

    // Create schedule for each day
    const schedule: DailySchedule[] = dates.map((date) => ({
      date,
      slots: timeSlots,
    }));

    return schedule;
  } catch (error) {
    // Error handling
    throw new Error(`Failed to create schedule: ${(error as Error).message}`);
  }
};

// Example usage
const example = async () => {
  try {
    const payload: SchedulePayload = {
      startDate: "2026-10-15",
      endDate: "2026-10-20",
      startTime: "10:00",
      endTime: "17:00",
    };

    const schedule = await createSchedule(payload);
    console.log(JSON.stringify(schedule, null, 2));
  } catch (error) {
    console.error(error);
  }
};


*/
