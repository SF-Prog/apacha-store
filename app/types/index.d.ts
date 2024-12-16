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
  price: number,
  description?: string
  meassure?: string
}

interface ProductListByCategory {
  name: string,
  products: ProductItem[]
}

interface CartItem extends ProductItem {
  quantity: number
}

interface StoreContextType {
  products: ProductListByCategory[],
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
  toggleMeal: (id: string) => void,
}
