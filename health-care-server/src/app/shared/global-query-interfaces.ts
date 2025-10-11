//

//* GLOBAL QUERY INTERFACES *//

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

type iPaginationAndSearchQuery = iPaginationQuery & iSearchQuery;

//* USER QUERY INTERFACES
export interface iUserSearchQuery extends iPaginationAndSearchQuery {
  email?: string;
  status?: string;
  role?: string;
  needPasswordChange?: string;
}

//

//* ADMIN QUERY INTERFACES
export interface iAdminSearchQuery extends iPaginationAndSearchQuery {
  name?: string;
  email?: string;
  contactNumber?: string;
  isDeleted?: string;
}

//

//* PATIENT QUERY INTERFACES
export interface iPatientSearchQuery extends iPaginationAndSearchQuery {
  email?: string;
  name?: string;
  address?: string;
  isDeleted?: string;
}

//* DOCTOR QUERY INTERFACES
export interface iDoctorSearchQuery extends iPaginationAndSearchQuery {
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
