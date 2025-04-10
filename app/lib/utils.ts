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
    const productsOfCat = cur.products.map((prod) => {
      return {
        ...prod,
        category: {
          name: cur.category,
          priority: cur.category_priority,
          id: cur.category_id,
        }
      };
    });
    return [].concat(acc, [...productsOfCat]);
  }, []);

  return productItems;
};

export const sortProductsByPriority = (data: ProductsByCategory[]) => {
  data.sort((a: ProductsByCategory, b: ProductsByCategory) => {
    return a.category_priority < b.category_priority ? 1 : -1;
  });

  data.map((cat) => {
    const catWithProductsSortedByPriority = cat.products.sort((a: ProductItem, b: ProductItem) => {
      return a.priority < b.priority ? 1 : -1
    });
    return catWithProductsSortedByPriority;
  });

  return data;
}

export const sortWorkshopsByPriority = (data: Workshop[]) => {
  return data.sort((a, b) => a.priority < b.priority ? 1 : -1);
};