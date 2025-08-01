import { v4 as uuidv4 } from "uuid";
export function getSessionId(): string {
  if (typeof window === "undefined") return "";

  const existing = localStorage.getItem("session_id");
  if (existing) return existing;

  const newSession = uuidv4();
  localStorage.setItem("session_id", newSession);
  return newSession;
}
