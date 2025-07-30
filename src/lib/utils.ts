import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getTruncatedFileName = (name: string, maxLength = 20) => {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex === -1 || name.length <= maxLength) return name;

  const base = name.substring(0, dotIndex);
  const ext = name.substring(dotIndex);

  const truncatedBase = base.length + ext.length > maxLength
    ? base.substring(0, maxLength - ext.length - 1) + "…"
    : base;

  return `${truncatedBase}${ext}`;
};

