import 'dotenv/config.js'
import './config/database.js'
import cors from 'cors'
import createError from 'http-errors'; // Módulo para crear errores HTTP
import express from 'express'; // Marco de trabajo para crear aplicaciones web
import cookieParser from 'cookie-parser'; // Módulo para analizar cookies de las solicitudes
import logger from 'morgan'; // Módulo para el registro (logging) de solicitudes y respuestas
import path from 'path'; // Módulo para trabajar con rutas de archivos y directorios
import indexRouter from './routes/index.js'; // Enrutador para la página principal
import { __dirname } from './utils/util.js';
// Crear una instancia de la aplicación Express
const app = express();

/* el método .use se utiliza para agregar middleware a la cadena de manejo de solicitudes. El middleware es una función que se ejecuta en el proceso de manejo de una solicitud HTTP antes de que llegue a su manejador final. Esto permite realizar tareas como la autenticación, validación de datos, manipulación de encabezados, entre otras, antes de que la solicitud llegue a la ruta o función de manejo principal. */
app.use(cors())
app.use(logger('dev')); // Configurar el registro de solicitudes en modo "dev"
app.use(express.json()); // Analizar solicitudes JSON
app.use(express.urlencoded({ extended: false })); // Analizar solicitudes de formularios
app.use(cookieParser()); // Analizar cookies en las solicitudes
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta "public"

// Configurar enrutadores para rutas específicas
app.use('/', indexRouter); // Usar el enrutador para la página principal


// Capturar solicitudes no manejadas y generar un error 404
app.use((req, res, next) => {
  next(createError(404));
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  // Configurar información del error para mostrar en el entorno de desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderizar la página de error con la información correspondiente
  res.status(err.status || 500);
  res.render('error');
});

export default app; // Exportar la instancia de la aplicación Express
