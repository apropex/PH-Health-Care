type Action = "view" | "create" | "edit" | "delete";
type Resource = "post";
type Permission = `${Action}:${Resource}`;

export const UserRole = {
  USER: "USER",
  MODERATOR: "MODERATOR",
  ADMIN: "ADMIN",
} as const;

const PERMISSIONS = {
  [UserRole.USER]: ["view:post"],
  [UserRole.MODERATOR]: ["view:post", "create:post", "edit:post"],
  [UserRole.ADMIN]: ["view:post", "create:post", "edit:post", "delete:post"],
} as const;

type tUserRole = (typeof UserRole)[keyof typeof UserRole];

export const checkPermission = (role: tUserRole, action: Action, resource: Resource) => {
  const permission = PERMISSIONS[role] as readonly Permission[];
  return permission.includes(`${action}:${resource}` as Permission);
};
