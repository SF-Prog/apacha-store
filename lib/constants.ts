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
    url: '/menu'
  },
  {
    title: "Productos para el día a día",
    description: "Contamos con productos que pueden ser grandes aliados para tu rutina, así como para reuniones y otras actividades.",
    image: "/products-dips-2.jpg",
    url: '/products'
  },
  {
    title: "Talleres",
    description: "Parte de nuestro disfrute es poder compartir el conocimiento y herramientas que hemos aprendido y adquirido en todo este tiempo. Queremos compartirlo para que puedas disfrutar cocinar alimentos ricos y nutritivos en tu casa con tu familia y amigo",
    image: "/workshop-people.png",
    url: '/events',
    customStyle: { objectFit: 'cover', objectPosition: 'center -600px' }
  },
  {
    title: "Caterings y Eventos",
    description: "Ofrecemos un servicio de catering personalizado y diseñado para cada cliente. Es ideal para agasajar a los invitados con comida deliciosa, novedosa y nutritiva. Al ser sin gluten y sin ingredientes de origen animal también la consideramos inclusiva, ya que todos los invitados podrán disfrutar.",
    image: "/caterings-table.jpg",
    url: "/catering",
  }
];

const toasterStatus = {
  ERROR: 'Error',
  SUCCESS: 'Success',
}

export {
  weeklyMenuExample,
  services,
  toasterStatus
};