import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NCAA_API_BASE = "https://ncaa-api.henrygd.me";

type ApiError = {
  status: number;
  message: string;
};

export class HoopflowError extends Error {
  status: number;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "HoopflowError";
    this.status = error.status;
  }
}

export function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
