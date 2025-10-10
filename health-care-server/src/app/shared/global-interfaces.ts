//

//* GLOBAL INTERFACES *//

export type iQuery = Record<string, unknown>;

export interface iPaginationQuery {
  page?: string;
  limit?: string;
}

export interface iSearchQuery {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

type IPS = iPaginationQuery & iSearchQuery;

export interface iUserSearchQuery extends IPS {
  email?: string;
  status?: string;
  role?: string;
  // [key: string]: string | undefined;
}

export interface iDoctorSearchQuery extends IPS {
  name?: string;
  email?: string;
  contactNumber?: string;
  address?: string;
  registrationNumber?: string;
  experience?: string;
  gender?: string;
  appointmentFee?: string;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  isDeleted?: string;
}
