/* eslint-disable @typescript-eslint/no-explicit-any */
import { tAppointmentStatus, tPaymentStatus } from "@/constants";

export interface iSchedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface iAppointment {
  id: string;
  videoCallingId: string;
  status: tAppointmentStatus;
  paymentStatus: tPaymentStatus;
}

export interface iPayment {
  id: string;
  amount: number;
  transactionId: string;
  status: tPaymentStatus;
  paymentGatewayData: any;
  appointmentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface iPrescription {
  id: string;
  instruction: string;
  followUpdate: string;
  createdAt: string;
  updatedAt: string;
}

export interface iReview {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}
