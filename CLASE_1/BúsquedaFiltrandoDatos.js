let productos = [
    { nombre: 'Camisa', categoria: 'Ropa', precio: 20 },
    { nombre: 'Computadora', categoria: 'Electrónica', precio: 800 },
    { nombre: 'Zapatos', categoria: 'Ropa', precio: 50 },
    { nombre: 'Teléfono', categoria: 'Electrónica', precio: 300 }
];
 const productosRopa = productos.filter(producto => producto.categoria === 'Ropa');
 const preciosMayores = productos.filter(producto => producto.precio > 30);
 console.log('Los productos con categoria de ropa son; ', productosRopa);
 console.log('Los productos con presio mayor a $ 30 son;', preciosMayores);
