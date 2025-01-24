interface MealPack {
  id: string
  title: string
  image: string
  description: string
  price: number
  whatsappLink: string
}

interface ProductItem {
  id: string
  title: string
  image: string
  price: number
  description?: string
  meassure?: string
}

interface ProductsByCategory {
  name: string
  products: ProductItem[]
}

interface CartItem extends ProductItem {
  quantity: number
}


interface ToasterType {
  SUCCESS: 'SUCCESS'
  ERROR: 'ERROR'
  WARNING: 'WARNING'
  INFO: 'INFO'
}

interface Meals {
  breakfast: string
  lunch: string
  dinner: string
}

interface WeeklyMenuItem {
  day: string
  meals: Meals
}

interface Service {
  title: string,
  description: string,
  image: string,
  url: string,
  customStyle?: unknown
}

interface StoreContextType {
  products: ProductsByCategory[],
  cartItems: CartItem[]
  total: number
  addCartItem: (item: ProductItem) => void
  removeCartItem: (itemId: string) => void
  emptyCart: () => void
  updateCartFromStorage: () => void,
  onCartCheckout: () => void,
  selectedMeals: string[],
  totalMealsPrice: number,
  mealPacks: MealPack[],
  toggleMeal: (id: string) => void
  sendWeeklyMenuToEmail: (email: string) => void,
  weeklyMenuExample: WeeklyMenuItem[],
  services: Service[],
  loadProducts: () => void
}

// Admin context interfaces
interface UserCredential {
  email: string,
  password: string,
}

interface AuthContextType {
  loginUser: (data: UserCredential) => void,
}

// Admin context interfaces

interface AdminContextType {
  addProduct: () => void,
  removeProduct: () => void,
  editProduct: () => void,
}