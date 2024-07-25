// insertProducts.js
import 'dotenv/config.js'
import '../../config/database.js'
import mongoose from 'mongoose';
import Product from '../Product.js';
import Category from '../Category.js';

// Obtener IDs de Categorías
const getCategoryIds = async () => {
  const categories = await Category.find();
  return categories.reduce((acc, category) => {
    acc[category.name] = category._id;
    return acc;
  }, {});
};

// Crear Array de Productos
const createProductsArray = (categoryIds) => [
  {
    name: 'Vodka Smirnoff Rasberry 700ml',
    description: 'Vodka Smirnoff sabor frambuesa de 700ml.',
    price: 10276,
    category: categoryIds['Vinos y Licores'],
    stock: 100,
    images: ['url_de_imagen']
  },
  {
    name: 'Vodka Smirnoff Green Apple 700ml',
    description: 'Vodka Smirnoff sabor manzana verde de 700ml.',
    price: 10285,
    category: categoryIds['Vinos y Licores'],
    stock: 100,
    images: ['url_de_imagen']
  },
  {
    name: 'Vodka Smirnoff Rasberry 700ml',
    description: 'Vodka Smirnoff sabor frambuesa de 700ml.',
    price: 12089,
    category: categoryIds['Vinos y Licores'],
    stock: 100,
    images: ['url_de_imagen']
  },
  {
    name: 'Champagne Federico De Alvear',
    description: 'Champagne Federico De Alvear.',
    price: 7130,
    category: categoryIds['Vinos y Licores'],
    stock: 50,
    images: ['url_de_imagen']
  },
  {
    name: 'Gin Principe De Los Apostoles',
    description: 'Gin Principe De Los Apostoles.',
    price: 13498,
    category: categoryIds['Vinos y Licores'],
    stock: 70,
    images: ['url_de_imagen']
  },
  {
    name: 'Vodka Absolut Original 750ml',
    description: 'Vodka Absolut Original de 750ml.',
    price: 249815,
    category: categoryIds['Vinos y Licores'],
    stock: 80,
    images: ['url_de_imagen']
  },
  {
    name: 'Vodka Smirnoff Watermelon 700ml',
    description: 'Vodka Smirnoff sabor sandía de 700ml.',
    price: 10285,
    category: categoryIds['Vinos y Licores'],
    stock: 90,
    images: ['url_de_imagen']
  },
  {
    name: 'Gin Bombay Sapphire 750ml',
    description: 'Gin Bombay Sapphire de 750ml.',
    price: 3544075,
    category: categoryIds['Vinos y Licores'],
    stock: 60,
    images: ['url_de_imagen']
  },
  {
    name: 'Vodka Absolut Botella 750ml',
    description: 'Vodka Absolut de 750ml.',
    price: 24650,
    category: categoryIds['Vinos y Licores'],
    stock: 80,
    images: ['url_de_imagen']
  },
  {
    name: 'Aperitivo Aperol 750ml',
    description: 'Aperitivo Aperol de 750ml.',
    price: 1444779,
    category: categoryIds['Vinos y Licores'],
    stock: 50,
    images: ['url_de_imagen']
  },
  // Añadir más productos según sea necesario hasta tener 20 productos
  {
    name: 'Margarita Mix',
    description: 'Mezcla para preparar margaritas de 750ml.',
    price: 8500,
    category: categoryIds['Cocteleria'],
    stock: 150,
    images: ['url_de_imagen']
  },
  {
    name: 'Piña Colada Mix',
    description: 'Mezcla para preparar piña colada de 750ml.',
    price: 8700,
    category: categoryIds['Cocteleria'],
    stock: 150,
    images: ['url_de_imagen']
  },
  {
    name: 'Daiquiri Mix',
    description: 'Mezcla para preparar daiquiris de 750ml.',
    price: 9000,
    category: categoryIds['Cocteleria'],
    stock: 120,
    images: ['url_de_imagen']
  },
  {
    name: 'Bloody Mary Mix',
    description: 'Mezcla para preparar Bloody Mary de 750ml.',
    price: 8900,
    category: categoryIds['Cocteleria'],
    stock: 130,
    images: ['url_de_imagen']
  },
  {
    name: 'Mojito Mix',
    description: 'Mezcla para preparar mojitos de 750ml.',
    price: 9100,
    category: categoryIds['Cocteleria'],
    stock: 140,
    images: ['url_de_imagen']
  },
  {
    name: 'Whiskey Sour Mix',
    description: 'Mezcla para preparar Whiskey Sour de 750ml.',
    price: 9300,
    category: categoryIds['Cocteleria'],
    stock: 100,
    images: ['url_de_imagen']
  },
  {
    name: 'Cosmopolitan Mix',
    description: 'Mezcla para preparar Cosmopolitan de 750ml.',
    price: 9200,
    category: categoryIds['Cocteleria'],
    stock: 110,
    images: ['url_de_imagen']
  },
  {
    name: 'Mai Tai Mix',
    description: 'Mezcla para preparar Mai Tai de 750ml.',
    price: 9500,
    category: categoryIds['Cocteleria'],
    stock: 90,
    images: ['url_de_imagen']
  },
  {
    name: 'Long Island Iced Tea Mix',
    description: 'Mezcla para preparar Long Island Iced Tea de 750ml.',
    price: 9700,
    category: categoryIds['Cocteleria'],
    stock: 85,
    images: ['url_de_imagen']
  },
  {
    name: 'Tom Collins Mix',
    description: 'Mezcla para preparar Tom Collins de 750ml.',
    price: 9400,
    category: categoryIds['Cocteleria'],
    stock: 105,
    images: ['url_de_imagen']
  },
  {
    name: 'La Jugada Ganadora',
    description: 'Paquete con 1 botella de whisky, 1 bolsa de hielo y 2 bolsas de papitas.',
    price: 5000,
    category: categoryIds['Paquetes'],
    stock: 50,
    images: ['url_de_imagen']
  },
  {
    name: 'Amigos en la Noche',
    description: 'Paquete con 1 botella de vodka, 1 bolsa de hielo y 6 latas de refresco.',
    price: 5500,
    category: categoryIds['Paquetes'],
    stock: 45,
    images: ['url_de_imagen']
  },
  {
    name: 'Fiesta de Fin de Semana',
    description: 'Paquete con 1 botella de ron, 1 bolsa de hielo, 6 cervezas y 2 bolsas de papitas.',
    price: 6000,
    category: categoryIds['Paquetes'],
    stock: 40,
    images: ['url_de_imagen']
  },
  {
    name: 'Relax en Casa',
    description: 'Paquete con 1 botella de vino tinto, 1 bolsa de hielo y 1 queso.',
    price: 4500,
    category: categoryIds['Paquetes'],
    stock: 55,
    images: ['url_de_imagen']
  },
  {
    name: 'El Party Starter',
    description: 'Paquete con 1 botella de tequila, 1 bolsa de hielo y 1 salsa de nachos.',
    price: 5200,
    category: categoryIds['Paquetes'],
    stock: 60,
    images: ['url_de_imagen']
  },
  {
    name: 'Reunión con Amigos',
    description: 'Paquete con 1 botella de ginebra, 1 bolsa de hielo, 4 tónicas y 2 bolsas de papitas.',
    price: 5800,
    category: categoryIds['Paquetes'],
    stock: 50,
    images: ['url_de_imagen']
  },
  {
    name: 'Tarde de Pelis',
    description: 'Paquete con 1 botella de licor de café, 1 bolsa de hielo, 1 paquete de palomitas y 2 bolsas de papitas.',
    price: 4900,
    category: categoryIds['Paquetes'],
    stock: 70,
    images: ['url_de_imagen']
  },
  {
    name: 'Celebración Familiar',
    description: 'Paquete con 1 botella de champán, 1 bolsa de hielo, 1 queso y 1 caja de chocolates.',
    price: 6500,
    category: categoryIds['Paquetes'],
    stock: 30,
    images: ['url_de_imagen']
  },
  {
    name: 'La Noche Perfecta',
    description: 'Paquete con 1 botella de mezcal, 1 bolsa de hielo y 1 paquete de chicharrones.',
    price: 5400,
    category: categoryIds['Paquetes'],
    stock: 60,
    images: ['url_de_imagen']
  },
  {
    name: 'Brindis con Amigos',
    description: 'Paquete con 1 botella de vino blanco, 1 bolsa de hielo y 1 paquete de frutos secos.',
    price: 4800,
    category: categoryIds['Paquetes'],
    stock: 55,
    images: ['url_de_imagen']
  }
];

// Insertar Productos en la Base de Datos
const insertProducts = async () => {
  const categoryIds = await getCategoryIds();
  const products = createProductsArray(categoryIds);
  
  Product.insertMany(products)
    .then(() => {
      console.log('Productos insertados correctamente');
      mongoose.connection.close();
    })
    .catch(err => {
      console.error('Error al insertar productos', err);
      mongoose.connection.close();
    });
};

insertProducts();
