import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import toast from "react-hot-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function displayToaster(type: string, message: string) {
  switch(type) {
    case('SUCCESS'): {
      toast.success(message);
      break;
    }
    case('ERROR'): {
      toast.error(message);
      break;
    }
  }
}