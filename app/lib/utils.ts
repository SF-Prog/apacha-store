import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import toast from "react-hot-toast";
import { toasterStatus } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function displayToaster(type: string, message: string) {
  switch(type) {
    case(toasterStatus.SUCCESS): {
      toast.success(message);
      break;
    }
    case(toasterStatus.ERROR): {
      toast.error(message);
      break;
    }
  }
}