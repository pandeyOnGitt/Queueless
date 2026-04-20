export const ROLE = {
  ADMIN: 1,
  USER: 2,
} as const;

export type RoleId = (typeof ROLE)[keyof typeof ROLE];
