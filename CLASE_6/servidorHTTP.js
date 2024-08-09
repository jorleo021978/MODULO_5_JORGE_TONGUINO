import http from 'http';
import url from 'url';
import fs from 'fs';

const port = 3002;
const filePath = './products.json';

const readProductsFromFile = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo el archivo:', error);
        return [];
    }
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;
    const query = parsedUrl.query;

    if (method === 'GET') {
        const products = readProductsFromFile();

        if (path === '/products') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        } else if (path.startsWith('/products/')) {
            const id = parseInt(path.split('/')[2], 10);
            const product = products.find(p => p.id === id);

            if (product) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(product));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Producto no existe' }));
            }
        } else if (path === '/search') {
            const name = query.name?.toLowerCase();
            const minPrice = query.minPrice ? parseFloat(query.minPrice) : 0;
            const maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : Infinity;
            const category = query.category?.toLowerCase();

            const foundProducts = products.filter(p => {
                const matchesName = name ? p.name.toLowerCase().includes(name) : true;
                const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
                const matchesCategory = category ? p.category.toLowerCase() === category : true;
                return matchesName && matchesPrice && matchesCategory;
            });

            if (foundProducts.length > 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(foundProducts));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Producto no existe' }));
            }
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Método no permitido' }));
    }
});

server.listen(port, () => {
    console.log(`El servidor se inició con éxito en el puerto ${port}`);
});
