const TOKEN_KEY = "queueless_token";
const ROLE_ID_KEY = "queueless_role_id";

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(TOKEN_KEY) ?? "";
}

export function setToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function setRoleId(roleId: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ROLE_ID_KEY, String(roleId));
}

export function getRoleId() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ROLE_ID_KEY) ?? "";
}

export function isAdminRole() {
  return getRoleId() === "1";
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_ID_KEY);
}
