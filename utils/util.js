import path from 'path'; // Módulo para trabajar con rutas de archivos y directorios
import { fileURLToPath } from 'url'; // Módulo para convertir URL en rutas de archivo
// Obtener la ruta del archivo actual (__filename) y su directorio (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export {__filename, __dirname}