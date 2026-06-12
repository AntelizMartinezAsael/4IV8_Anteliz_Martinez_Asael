// Primero necesitamos crear un servidor para la aplicación y ahí mismo montar nuestra BD
const http = require('http');
// El módulo para leer los archivos del sistema
const fs = require('fs');
// El módulo para la ruta a identificar el archivo
const path = require('path');
// El módulo nativo para extraer parámetros
const url = require('url');
// Este módulo lo tenemos que descargar con el comando npm install mysql2
const mysql = require('mysql2');

// Configurar el puerto del servidor
const PORT = process.env.PORT || 3000;

// Vamos a conectarnos a la BD
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'pnt_practica1',
    waitForConnections: true, // Esperar si no hay conexiones disponibles
    connectionLimit: 10,       // Máximo de conexiones simultáneas
    queueLimit: 0              // Sin límite en la cola de espera
});

// Promesa de conexión para usar async/await
const db = pool.promise();

// Tipos de archivos aceptados (MIME)
const MIME_TYPES = {
    'html': 'text/html; charset=utf-8',
    'css': 'text/css; charset=utf-8',
    'js': 'application/javascript; charset=utf-8',
    'json': 'application/json; charset=utf-8',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'ico': 'image/x-icon'
};

// Función para servir archivos estáticos desde la carpeta 'public'
function servirArchivoEstatico(pathname, res) {
    // Si la ruta es '/' servimos el index.html
    let filePath = pathname === '/' ? '/index.html' : pathname;
    const fullPath = path.join(__dirname, 'public', filePath);
    
    // Obtenemos la extensión sin el punto (.)
    const ext = path.extname(fullPath).toLowerCase().replace('.', '');
    const mimeType = MIME_TYPES[ext];

    if (!mimeType) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Archivo no encontrado o tipo no permitido');
        return;
    }

    // Leemos el archivo físico
    fs.readFile(fullPath, (error, contenido) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Archivo no encontrado');
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(contenido);
        }
    });
}

// Procesa el cuerpo de peticiones POST/PUT
function leerBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
            if (body.length > 1e6) { // Limite de 1MB aproximadamente
                req.destroy();
                reject(new Error('Body demasiado grande'));
            }
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                reject(new Error('JSON inválido'));
            }
        });
        req.on('error', reject);
    });
}

// Helper para enviar respuestas en formato JSON
function enviarJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
}

// Crear y configurar el comportamiento del servidor
const server = http.createServer(async (req, res) => {
    const parseUrl = url.parse(req.url, true);
    const pathname = parseUrl.pathname;
    const method = req.method;

    // Imprimir el log de la petición
    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${pathname}`);

    // --- SECCIÓN DE LA API (CONEXIÓN A BASE DE DATOS) ---
    if (pathname.startsWith('/api/')) {
        try {
            // Ejemplo de ruta GET para obtener datos
            if (method === 'GET' && pathname === '/api/usuarios') {
                const [lineas] = await db.query('SELECT * FROM usuarios'); // Cambia 'usuarios' por tu tabla real
                return enviarJSON(res, 200, lineas);
            }

            // Ejemplo de ruta POST para insertar datos
            if (method === 'POST' && pathname === '/api/usuarios') {
                const body = await leerBody(req);
                // Ejemplo de consulta preparada:
                // const [resultado] = await db.query('INSERT INTO usuarios (nombre) VALUES (?)', [body.nombre]);
                return enviarJSON(res, 201, { mensaje: 'Recibido correctamente', datos: body });
            }

            // Si empieza con /api/ pero no coincide con ningún endpoint anterior
            return enviarJSON(res, 404, { error: 'Endpoint de la API no encontrado' });

        } catch (error) {
            console.error('Error en la API:', error.message);
            return enviarJSON(res, 500, { error: 'Error interno del servidor', detalle: error.message });
        }
    }

    // --- SECCIÓN DE ARCHIVOS ESTÁTICOS ---
    // Si la url no pertenece a la API, buscamos el archivo en la carpeta public
    servirArchivoEstatico(pathname, res);
});

// Inicializamos el servidor
server.listen(PORT, () => {
    console.log('Servidor inicializado en el puerto: ' + PORT);
    console.log('Para salir presiona Ctrl + C');
});