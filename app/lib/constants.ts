const weeklyMenuExample: WeeklyMenuItem[] = [
  { 
    day: 'Lunes', 
    meals: {
      breakfast: 'Avena con frutas y nueces',
      lunch: 'Curry de garbanzos y espinacas',
      dinner: 'Ensalada de quinoa con verduras asadas'
    }
  },
  { 
    day: 'Martes', 
    meals: {
      breakfast: 'Tostadas de aguacate y tomate',
      lunch: 'Lasaña de verduras',
      dinner: 'Sopa de lentejas con pan integral'
    }
  },
  { 
    day: 'Miércoles', 
    meals: {
      breakfast: 'Smoothie bowl de açaí',
      lunch: 'Bowl de quinoa y vegetales asados',
      dinner: 'Tacos de jackfruit'
    }
  },
  { 
    day: 'Jueves', 
    meals: {
      breakfast: 'Pancakes de banana y avena',
      lunch: 'Ensalada mediterránea con falafel',
      dinner: 'Pasta primavera'
    }
  },
  { 
    day: 'Viernes', 
    meals: {
      breakfast: 'Yogur vegano con granola y frutas',
      lunch: 'Wrap de hummus y vegetales',
      dinner: 'Risotto de hongos'
    }
  },
];

const services: Service[] = [
  {
    title: "Sistema de viandas",
    description: "Te ayudamos a organizarte y disfrutar de una alimentación nutritiva durante la semana. Contamos con opciones de desayuno, almuerzo y cena para que tengas cubiertas las comidas de lunes a viernes.",
    image: "/lunch-fridge-2.jpg",
    url: '/viandas'
  },
  {
    title: "Almacén",
    description: "Contamos con productos que pueden ser grandes aliados para tu rutina, así como para reuniones y otras actividades.",
    image: "/products-dips-2.jpg",
    url: '/almacen'
  },
  {
    title: "Talleres",
    description: "Parte de nuestro disfrute es poder compartir el conocimiento y herramientas que hemos aprendido y adquirido en todo este tiempo. Queremos compartirlo para que puedas disfrutar cocinar alimentos ricos y nutritivos en tu casa con tu familia y amigo",
    image: "/workshop-people.png",
    url: '/talleres',
    customStyle: { objectFit: 'cover', objectPosition: 'center center' }
  },
  {
    title: "Caterings y Eventos",
    description: "Ofrecemos un servicio de catering personalizado y diseñado para cada cliente. Es ideal para agasajar a los invitados con comida deliciosa, novedosa y nutritiva. Al ser sin gluten y sin ingredientes de origen animal también la consideramos inclusiva, ya que todos los invitados podrán disfrutar.",
    image: "/caterings-table.jpg",
    url: "/eventos",
  }
];

const toasterStatus = {
  ERROR: 'Error',
  SUCCESS: 'Success',
}

const emptyProduct = {
  id: '',
  title: '',
  image: '',
  price: 0,
  description: '',
  meassures: '',
  category: ''
}

const emptyProductCategory = {
  name: '',
  priority: 0
}


const mealPacks: MealPack[] = [
  {
    id: '1',
    title: "DESAYUNO Y ALMUERZO",
    weeklyPrice: 2600,
    monthlyPrice: 9800,
    color: "#8B5C8B",
    whatsappLink: `https://wa.me/59898958230?text=Hola%21%20Me%20interesa%20recibir%20más%20información%20sobre%20el%20Pack%20Desayuno%20y%20Almuerzo`
  },
  {
    id: '2',
    title: "ALMUERZO Y CENA",
    weeklyPrice: 3150,
    monthlyPrice: 12000,
    color: "#F4A460",
    whatsappLink: `https://wa.me/59898958230?text=Hola%21%20Me%20interesa%20recibir%20más%20información%20sobre%20el%20Pack%20Almuerzo%20y%20Cena`
  },
  {
    id: '3',
    title: "DESAYUNO, ALMUERZO Y CENA",
    weeklyPrice: 4100,
    monthlyPrice: 15200,
    color: "#8B9D8B",
    whatsappLink: `https://wa.me/59898958230?text=Hola%21%20Me%20interesa%20recibir%20más%20información%20sobre%20el%20Pack%20Desayuno,%20Almuerzo%20y%20Cena`
  }
];


const meals: Meal[] = [
  {
    id: 'breakfast-prod',
    title: "Desayuno",
    description: "Jugos y licuados a base de frutas y verduras. Es una gran manera de comenzar el día hidratado e incorporando nutrientes, vitaminas y antioxidantes.",
    prices: [200, 900, 3400],
    image: "/breakfast-preview.jpg",
  },
  {
    id: 'lunch-prod',
    title: "Almuerzo",
    description: "El plato principal es una celebración de sabores y nutrición. Desde ensaladas vibrantes hasta guisos reconfortantes, cada opción ofrece un mundo de sabores y nutrientes. Ideales para solucionar tus almuerzos de una manera diferente y así no caer en el aburrimiento y monotonía.",
    prices: [370, 1750, 6600],
    image: "/lunch-preview.jpg"
  },
  {
    id: 'dinner-prod',
    title: "Cena",
    description: "Sopa liviana y nutritiva. Al terminar el día y la rutina, muchas veces buscamos opciones prácticas para solucionar la cena. Las distintas variedades de sopas son ideales para incorporar a la rutina nocturna, ya que favorecerá a que te vayas a dormir liviano y de esta manera descansar mejor.",
    prices: [310, 1500, 5800],
    image: "/dinner-preview.jpg"
  }
];

const subscriptionTypes = {
  WORKSHOP: 'workshop',
  MENU: 'menu',
};

export {
  weeklyMenuExample,
  services,
  toasterStatus,
  emptyProduct,
  emptyProductCategory,
  mealPacks,
  meals,
  subscriptionTypes
};