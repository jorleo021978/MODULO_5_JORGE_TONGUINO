# Servidor HTTP en Node.js con API de Gestión de Productos

Este proyecto es una pequeña API construida en Node.js utilizando el módulo `http` para gestionar una lista de productos.

## Lectura de Datos

El servidor lee los datos de los productos desde un archivo llamado `products.json` ubicado en la raíz del proyecto. El contenido de este archivo es leído al iniciar el servidor y cada vez que se hace una solicitud GET.

## Puertos Utilizados

- **Puerto 3002:** El servidor escucha en este puerto. debe asegúrate que este puerto esté disponible la máquina antes de iniciar el servidor.

## Iniciar el Servidor

Para iniciar el servidor, ejecuta:

http://localhost:3002/products // todos los prodictos 
http://localhost:3002/products/1 // un solo producto po el ID

AUTOR; JORGE TONGUINO

