interface MealPack {
  id: string
  title: string
  weeklyPrice: number
  monthlyPrice: number
  whatsappLink: string
  color: string
}

interface Meal {
  id: string
  title: string
  description: string
  image: string
  price: number
  whatsappLink: string
}

interface ProductItem {
  id: string
  title: string
  image: string
  price: number
  description?: string
  meassures?: string,
  category?: string,
  qty: number,
  priority: number,
  is_published: boolean
}

interface ProductsByCategory {
  cat: string
  products: ProductItem[]
}

interface ProductCategory {
  id?: string,
  created_at?: string,
  name: string
}

interface Workshop {
  id: string
  title: string
  description: string
  date: string
  initial_time: string
  finalization_time: string
  location: string
  image: string
  is_published: boolean
  price: number,
  priority: number,
  capacity?: number,
  author?: string,
  social_media_link?: string
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
  meals: Meal[],
  mealPacks: MealPack[],
  toggleMeal: (id: string) => void
  sendWeeklyMenuToEmail: (email: string) => void,
  weeklyMenuExample: WeeklyMenuItem[],
  services: Service[],
  loadProducts: () => void,
  isLoading: boolean,
  setIsLoading: (is: boolean) => void,
  workshops: Workshop[],
  loadWorkshops: () => void,
  onRegisterToWorkshop: (w: Workshop) => void,
  sendEventRequest: (data: FormData) => Promise<boolean>
}

// Auth interfaces
interface UserCredential {
  email: string,
  password: string,
}

interface AuthContextType {
  loginUser: (data: UserCredential) => void,
  onLoginAdmin: () => void,
  isLoading: boolean,
  setIsLoading: (id: boolean) => void,
  password: string,
  setPassword: (p: string) => void,
  email: string,
  setEmail: (p: string) => void,
  isAdmin: () => Promise<boolean>
}

// Admin interfaces

interface AdminContextType {
  addProduct: (newProduct: FormData) => void,
  removeProduct: (id: string) => void,
  editProduct: (editedProduct: FormData) => void,
  productsList: ProductItem[],
  isLoading: boolean,
  showCreateProductModal: boolean,
  setShowCreateProductModal: (is: boolean) => void,
  showEditProductModal: boolean,
  setShowEditProductModal: (is: boolean) => void,
  productCategories: ProductCategory[],
  addProductCategory: (id: string) => void,
  removeProductCategory: (id: string) => void,
  updateProductCategory: (cat: ProductCategory) => void,
  workshops: Workshop[],
  addWorkshop: (w: FormData) => void,
  removeWorkshop: (id: string) => void,
  editWorkshop: (w: FormData) => void,
  showCreateWorkshopModal: boolean,
  setShowCreateWorkshopModal: (is: boolean) => void,
  showEditWorkshopModal: boolean,
  setShowEditWorkshopModal: (is: boolean) => void,
}

interface EventRequest {
  name: string
  email: string
  phone: string
  event_type: string
  message: string
  contact_preference: 'email' | 'whatsapp' | 'call'
  newsletter: boolean
  status: 'pending' | 'contacted' | 'completed'
  created_at?: string
}

type AdminPanelTabItem = 'products' | 'services' | 'product_categories' | 'events' | 'workshops';