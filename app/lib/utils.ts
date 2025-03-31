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

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function parseProductsList(productsByCategory) {
  if (!productsByCategory?.length) return [];
  const productItems = [...productsByCategory].reduce((acc, cur) => {
    return [].concat(acc, [...cur.products]);
  }, []);

  return productItems;
};