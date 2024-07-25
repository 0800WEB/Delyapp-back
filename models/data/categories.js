// insertCategories.js
import 'dotenv/config.js'
import '../../config/database.js'
import mongoose from 'mongoose';
import Category from '../Category.js';

// Array de Categorías
const categories = [
  { name: 'Entretenimiento', image: 'url_de_imagen_entretenimiento', description: 'Descripción de Entretenimiento' },
  { name: 'Paquetes', image: 'url_de_imagen_paquetes', description: 'Descripción de Paquetes' },
  { name: 'Snacks', image: 'url_de_imagen_snacks', description: 'Descripción de Snacks' },
  { name: "Pa' La Cruda", image: 'url_de_imagen_pa_la_cruda', description: 'Descripción de Pa La Cruda' },
  { name: 'Vinos y Licores', image: 'url_de_imagen_vinos_y_licores', description: 'Descripción de Vinos y Licores' },
  { name: 'Refresco y Agua', image: 'url_de_imagen_refresco_y_agua', description: 'Descripción de Refresco y Agua' },
  { name: 'Cerveza', image: 'url_de_imagen_cerveza', description: 'Descripción de Cerveza' },
  { name: 'Promociones', image: 'url_de_imagen_promociones', description: 'Descripción de Promociones' },
  { name: 'Cocteleria', image: 'url_de_imagen_cocteleria', description: 'Descripción de Cocteleria' },
];

// Insertar Categorías en la Base de Datos
Category.insertMany(categories)
  .then(() => {
    console.log('Categorías insertadas correctamente');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error al insertar categorías', err);
    mongoose.connection.close();
  });
