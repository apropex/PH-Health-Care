//

import { tUserRole } from "@/constants";

export interface RouteConfig {
  exact: string[];
  patterns: RegExp[];
}

export const authRoutes = ["/login", "/register", "/forgot-password"];

export const commonRoutes: RouteConfig = {
  exact: ["/my-profile"],
  patterns: [/^\/settings(\/|$)/],
};

export const doctorRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor(\/|$)/],
};

export const adminRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin(\/|$)/],
};

export const patientRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/dashboard(\/|$)/],
};

export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route: string) => route === pathname);
};

export const isValidRoute = (routes: RouteConfig, pathname: string): boolean => {
  const exact = routes.exact.includes(pathname);
  const pattern = routes.patterns.some((regex) => regex.test(pathname));
  return exact || pattern || false;
};

export const getRouteOwner = (pathname: string): tUserRole | "COMMON" | null => {
  if (isValidRoute(adminRoutes, pathname)) return "ADMIN";
  if (isValidRoute(patientRoutes, pathname)) return "PATIENT";
  if (isValidRoute(doctorRoutes, pathname)) return "DOCTOR";
  if (isValidRoute(commonRoutes, pathname)) return "COMMON";
  return null;
};

export const getDefaultDashboardRoute = (role: tUserRole): string => {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "DOCTOR") return "/doctor/dashboard";
  if (role === "PATIENT") return "/dashboard";

  return "/";
};

export const isValidRedirectPath = (path: string, role: tUserRole): boolean => {
  const routeOwner = getRouteOwner(path);
  if (routeOwner === null || routeOwner === "COMMON") return true;
  return routeOwner === role;
};
