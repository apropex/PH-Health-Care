import { iScheduleSearchQuery } from "../../shared/global-query-interfaces";

//* USER CONSTANTS *\\
type iSchedule = (keyof iScheduleSearchQuery)[];

export const scheduleFilterFields: iSchedule = ["startDateTime", "endDateTime"];
